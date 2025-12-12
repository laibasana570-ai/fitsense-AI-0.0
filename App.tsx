import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import VideoAnalyzer from './components/VideoAnalyzer';
import WorkoutGenerator from './components/WorkoutGenerator';
import Profile from './components/Profile';
import Login from './components/Login';
import { getCurrentUsername } from './services/storageService';
import { ThemeContext, AuthContext, LanguageContext, ToastContext, ToastMessage, ToastType } from './contexts';
import { Language, translations } from './services/translations';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const App: React.FC = () => {
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('fitsense_theme');
      return saved ? JSON.parse(saved) : false; // Default to light mode
    } catch (e) {
      return false;
    }
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!getCurrentUsername();
  });

  // Language State
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('fitsense_language');
      return (saved as Language) || 'en';
    } catch (e) {
      return 'en';
    }
  });

  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Translation helper
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current[k] === undefined) {
        // Fallback to English
        current = (translations['en'] as any);
        for(const fk of keys) {
             current = current?.[fk];
        }
        return current || key;
      }
      current = current[k];
    }
    return typeof current === 'string' ? current : key;
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('fitsense_theme', JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('fitsense_language', language);
  }, [language]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
          <ToastContext.Provider value={{ showToast }}>
            <Router>
              <div className="min-h-screen text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300 overflow-hidden relative selection:bg-primary/20 selection:text-primary">
                
                {/* Dynamic Background - Softer Orange/Blue/Beige */}
                <div className="fixed inset-0 z-[-10] transition-colors duration-500">
                  {/* Base Layer */}
                  <div className={`absolute inset-0 ${isDark ? 'bg-[#0B1120]' : 'bg-[#F5F5F0]'}`}></div>
                  
                  {/* Light Mode: Soft Beige/Blue/Orange Mix */}
                  {!isDark && (
                    <>
                       <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-orange-100/60 to-transparent blur-3xl opacity-50"></div>
                       <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-100/60 to-transparent blur-3xl opacity-50"></div>
                       <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-brand-blue/5 blur-[80px]"></div>
                    </>
                  )}

                  {/* Dark Mode: Deep Slate/Blue/Orange Mix */}
                  {isDark && (
                    <>
                       <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"></div>
                       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px]"></div>
                    </>
                  )}
                </div>

                {/* Toast Container */}
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-md px-4">
                  {toasts.map((toast) => (
                    <div 
                      key={toast.id} 
                      className={`
                        animate-slide-down flex items-center gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md
                        ${toast.type === 'success' ? 'bg-white/95 dark:bg-slate-800/95 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 
                          toast.type === 'error' ? 'bg-white/95 dark:bg-slate-800/95 text-red-600 dark:text-red-400 border-red-500/20' : 
                          'bg-white/95 dark:bg-slate-800/95 text-brand-blue dark:text-blue-400 border-blue-500/20'}
                      `}
                    >
                      {toast.type === 'success' && <CheckCircle size={20} />}
                      {toast.type === 'error' && <AlertCircle size={20} />}
                      {toast.type === 'info' && <Info size={20} />}
                      <span className="font-semibold text-sm flex-1">{toast.message}</span>
                      <button onClick={() => removeToast(toast.id)} className="opacity-60 hover:opacity-100 transition-opacity">
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="z-50 relative flex flex-col w-full h-full">
                  <Navbar />
                  {/* Main content */}
                  <main className="flex-1 px-4 md:px-8 pt-24 pb-24 md:pt-8 md:pb-12 overflow-y-auto h-screen relative scroll-smooth custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/analyze" element={<VideoAnalyzer />} />
                        <Route path="/generate" element={<WorkoutGenerator />} />
                        
                        {/* Auth Flow Routes */}
                        <Route 
                          path="/profile" 
                          element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} 
                        />
                        <Route 
                          path="/login" 
                          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} 
                        />
                        
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              </div>
            </Router>
          </ToastContext.Provider>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;