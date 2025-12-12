import React, { useState, useContext } from 'react';
import { loginUser, registerUser, getAllUsers } from '../services/storageService';
import { AuthContext, LanguageContext, ToastContext } from '../contexts';
import { Activity, Mail, Lock, User, ArrowRight, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Google Auth State
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleView, setGoogleView] = useState<'chooser' | 'input'>('chooser');
  const [googleEmail, setGoogleEmail] = useState('');
  
  const [fieldError, setFieldError] = useState<string | null>(null);
  
  const { setIsAuthenticated } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const { showToast } = useContext(ToastContext);

  // Mock accounts for the Google Chooser simulation
  const mockGoogleAccounts = [
    { name: "Demo User", email: "user@example.com", avatar: "D", color: "bg-purple-600" },
    { name: "Fitness Pro", email: "trainer@fitsense.ai", avatar: "F", color: "bg-emerald-600" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);

    if (!username || !password) {
      setFieldError(t('login.errorMissing'));
      showToast(t('login.errorMissing'), 'error');
      return;
    }

    setIsLoading(true);

    // Simulate network delay for realism
    setTimeout(() => {
      const users = getAllUsers();
      
      if (isRegistering) {
        if (users[username]) {
          setFieldError(t('login.errorExists'));
          showToast(t('login.errorExists'), 'error');
        } else {
          registerUser(username, password, email);
          loginUser(username, password);
          setIsAuthenticated(true);
          showToast(`Welcome to FitSense, ${username}! 🚀`, 'success');
        }
      } else {
        if (users[username]) {
           const success = loginUser(username, password);
           if (success) {
             setIsAuthenticated(true);
             showToast(`Welcome back, ${username}! 👋`, 'success');
           } else {
             setFieldError(t('login.errorInvalid'));
             showToast(t('login.errorInvalid'), 'error');
           }
        } else {
           registerUser(username, password, email || undefined);
           loginUser(username, password);
           setIsAuthenticated(true);
           showToast(`Account created! Welcome, ${username}! 🚀`, 'success');
        }
      }
      setIsLoading(false);
    }, 800);
  };

  const initGoogleFlow = () => {
    setGoogleView('chooser');
    setGoogleEmail('');
    setIsGoogleLoading(true);
    // Simulate initial network request to auth provider
    setTimeout(() => {
        setIsGoogleLoading(false);
        setShowGoogleModal(true);
    }, 600);
  };

  const performGoogleLogin = (name: string, email: string) => {
      // Simulate OAuth token exchange
      setTimeout(() => {
          const mockPass = `google-oauth-${email}`;
          
          // Check if user exists or register them
          const users = getAllUsers();
          // If username exists (collision), append random number
          let finalName = name;
          if (users[name] && users[name].email !== email) {
              finalName = `${name}${Math.floor(Math.random()*1000)}`;
          }

          if (!users[finalName]) {
              registerUser(finalName, mockPass, email);
          }
          loginUser(finalName, mockPass);
          
          setIsAuthenticated(true);
          showToast(`Signed in as ${finalName}`, 'success');
          setIsGoogleLoading(false);
          setShowGoogleModal(false);
      }, 1500);
  };

  const handleAccountSelect = (account: typeof mockGoogleAccounts[0]) => {
      setGoogleView('chooser'); // Ensure view
      setIsGoogleLoading(true);
      performGoogleLogin(account.name, account.email);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!googleEmail) return;
      
      setIsGoogleLoading(true);
      // Derive a display name from email (e.g. john.doe@gmail.com -> john.doe)
      const derivedName = googleEmail.split('@')[0];
      // Capitalize first letter for nicer UI
      const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
      
      performGoogleLogin(formattedName, googleEmail);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-fade-in px-4 py-8 relative">
      
      {/* Brand Header */}
      <div className="text-center mb-8">
         <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-700 rounded-2xl shadow-xl shadow-primary/30 mb-4 transform hover:scale-105 transition-transform duration-500">
             <Activity size={32} className="text-white" strokeWidth={3} />
         </div>
         <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            FitSense<span className="text-primary">.AI</span>
         </h1>
         <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
            {isRegistering ? "Create your professional account" : "Sign in to continue your progress"}
         </p>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 shadow-2xl rounded-3xl overflow-hidden relative z-10">
        {/* Progress Bar Loader */}
        {(isLoading || (isGoogleLoading && !showGoogleModal)) && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 overflow-hidden z-20">
                <div className="h-full bg-primary animate-progress-indeterminate"></div>
            </div>
        )}

        {/* Toggle Switch */}
        <div className="flex p-2 gap-2 border-b border-gray-100 dark:border-gray-700/50">
            <button 
                onClick={() => { setIsRegistering(false); setFieldError(null); }}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${!isRegistering ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
            >
                {t('login.loginBtn')}
            </button>
            <button 
                onClick={() => { setIsRegistering(true); setFieldError(null); }}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${isRegistering ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
            >
                {t('login.registerBtn')}
            </button>
        </div>

        <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Input */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                        {t('login.username')}
                    </label>
                    <div className="relative group focus-within:ring-2 ring-primary/30 rounded-xl transition-shadow">
                        <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors">
                            <User size={20} />
                        </div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl py-3.5 pl-11 pr-4 focus:border-primary focus:outline-none transition-colors font-medium"
                            placeholder={t('login.placeholderUser')}
                            autoComplete="username"
                        />
                    </div>
                </div>

                {/* Email Input (Register Only) */}
                {isRegistering && (
                    <div className="space-y-1.5 animate-fade-in">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                            {t('login.email')}
                        </label>
                        <div className="relative group focus-within:ring-2 ring-primary/30 rounded-xl transition-shadow">
                            <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl py-3.5 pl-11 pr-4 focus:border-primary focus:outline-none transition-colors font-medium"
                                placeholder="name@example.com"
                                autoComplete="email"
                            />
                        </div>
                    </div>
                )}

                {/* Password Input */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('login.password')}
                        </label>
                        {!isRegistering && (
                            <button type="button" className="text-xs font-semibold text-primary hover:text-primary-hover hover:underline">
                                Forgot?
                            </button>
                        )}
                    </div>
                    <div className="relative group focus-within:ring-2 ring-primary/30 rounded-xl transition-shadow">
                        <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors">
                            <Lock size={20} />
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl py-3.5 pl-11 pr-4 focus:border-primary focus:outline-none transition-colors font-medium"
                            placeholder={t('login.placeholderPass')}
                            autoComplete={isRegistering ? "new-password" : "current-password"}
                        />
                    </div>
                </div>

                {/* Error Message */}
                {fieldError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm font-semibold bg-red-50 dark:bg-red-500/10 p-3 rounded-lg animate-fade-in border border-red-500/20">
                        <AlertCircle size={16} />
                        {fieldError}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || isGoogleLoading}
                    className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <>
                            {isRegistering ? t('login.createAccount') : t('login.signIn')}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-[#1e293b] text-gray-500 font-medium rounded-full">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Google Button - Enhanced Styling */}
            <button
                type="button"
                onClick={initGoogleFlow}
                disabled={isGoogleLoading || isLoading}
                className="w-full relative py-3.5 bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3 group disabled:opacity-70 disabled:grayscale"
            >
                {isGoogleLoading && !showGoogleModal ? (
                    <div className="flex items-center gap-2">
                         <Loader2 size={20} className="animate-spin text-gray-400" />
                         <span>Connecting...</span>
                    </div>
                ) : (
                    <>
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span>Continue with Google</span>
                    </>
                )}
            </button>
        </div>
        
        {/* Footer info */}
        <div className="bg-gray-50 dark:bg-gray-800/80 p-4 text-center border-t border-gray-100 dark:border-gray-700/50">
             <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed max-w-xs mx-auto">
                {t('login.agreement')}
             </p>
        </div>
      </div>

      {/* Realistic Google OAuth Modal Simulation */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => { if(!isGoogleLoading) setShowGoogleModal(false); }}
          ></div>

          {/* Modal Content - Designed to look like Google Auth Window */}
          <div className="bg-white dark:bg-[#202124] w-full max-w-[400px] rounded-2xl shadow-2xl relative overflow-hidden animate-slide-down border border-gray-200 dark:border-gray-700">
             
             {isGoogleLoading && googleView !== 'chooser' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 overflow-hidden z-20">
                    <div className="h-full bg-blue-500 animate-progress-indeterminate"></div>
                </div>
             )}

             {/* Google Header */}
             <div className="flex flex-col items-center pt-10 pb-6 px-6 text-center">
                <svg className="w-8 h-8 mb-4" viewBox="0 0 24 24">
                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <h3 className="text-2xl font-normal text-gray-900 dark:text-gray-100">
                    {googleView === 'chooser' ? 'Sign in with Google' : 'Sign in'}
                </h3>
                <p className="text-[15px] text-gray-600 dark:text-gray-300 mt-2">
                    {googleView === 'chooser' 
                        ? <>Choose an account to continue to <span className="font-semibold text-primary">FitSense.AI</span></>
                        : <>to continue to <span className="font-semibold text-primary">FitSense.AI</span></>
                    }
                </p>
             </div>

             {/* Content Area */}
             <div className="px-6 pb-12 min-h-[200px]">
                {googleView === 'chooser' ? (
                    <div className="space-y-1">
                        {mockGoogleAccounts.map((account, idx) => (
                            <button 
                                key={idx}
                                onClick={() => handleAccountSelect(account)}
                                className="w-full flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-[#303134] rounded-full transition-colors group border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                            >
                                <div className={`w-8 h-8 rounded-full ${account.color} flex items-center justify-center text-white text-sm font-medium shadow-sm`}>
                                    {account.avatar}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white">
                                        {account.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {account.email}
                                    </p>
                                </div>
                            </button>
                        ))}
                        
                        {/* Use Another Account Button - Switches View */}
                        <button 
                            onClick={() => setGoogleView('input')}
                            className="w-full flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-[#303134] rounded-full transition-colors group mt-2"
                        >
                            <div className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-500 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                <User size={16} />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    Use another account
                                </p>
                            </div>
                        </button>
                    </div>
                ) : (
                    /* Input View - Simulating Email Entry */
                    <form onSubmit={handleCustomGoogleSubmit} className="animate-fade-in">
                        {/* Back Button */}
                        <button 
                             type="button"
                             onClick={() => setGoogleView('chooser')}
                             className="absolute top-4 left-4 p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                             title="Back to accounts"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <div className="mt-2 space-y-8">
                            <div className="relative group">
                                <input
                                    type="email"
                                    required
                                    autoFocus
                                    value={googleEmail}
                                    onChange={(e) => setGoogleEmail(e.target.value)}
                                    className="peer w-full h-14 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 pt-4 text-base text-gray-900 dark:text-white outline-none focus:border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                                />
                                <label className={`
                                    absolute left-3 top-4 text-gray-500 dark:text-gray-400 text-base transition-all duration-200 pointer-events-none px-1 bg-white dark:bg-[#202124]
                                    peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                                    peer-valid:-top-2.5 peer-valid:text-xs
                                    ${googleEmail ? '-top-2.5 text-xs' : ''}
                                `}>
                                    Email or phone
                                </label>
                            </div>

                            <button type="button" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 -ml-2 rounded">
                                Forgot email?
                            </button>

                            <div className="flex items-center justify-between pt-4">
                                <button type="button" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded">
                                    Create account
                                </button>
                                <button 
                                    type="submit"
                                    disabled={!googleEmail}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </form>
                )}
             </div>
             
             {/* Google Footer */}
             {/* Only show footer if not in loading state to avoid clutter during transition */}
             {!isGoogleLoading && (
                 <div className="py-4 px-6 border-t border-gray-100 dark:border-gray-700/50 flex justify-between text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#1a1b1e]">
                    <span>English (United States)</span>
                    <div className="flex gap-4">
                        <span>Help</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                 </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;