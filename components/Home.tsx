import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Camera, Dumbbell, LogIn, Activity, ArrowRight, Zap, Target, Shield, User, LogOut } from 'lucide-react';
import { LanguageContext, AuthContext, ThemeContext } from '../contexts';
import { logoutUser } from '../services/storageService';

const Home: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)] animate-fade-in relative overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className={`absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[100px] animate-pulse ${isDark ? 'bg-primary/5' : 'bg-orange-100/40'}`}></div>
          <div className={`absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[100px] ${isDark ? 'bg-brand-blue/5' : 'bg-blue-100/40'}`}></div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-12 md:py-24 px-4 space-y-8 max-w-5xl mx-auto relative z-10">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 dark:bg-white/5 text-primary dark:text-orange-400 text-xs md:text-sm font-bold tracking-widest uppercase border border-primary/10 dark:border-white/5 backdrop-blur-md shadow-sm hover:scale-105 transition-transform cursor-default">
           <Zap size={14} className="fill-current" /> 
           <span>AI-Powered Fitness</span>
        </div>
        
        {/* Main Heading - Orange & Grey/Blue Gradient */}
        <h1 className="flex flex-col items-center justify-center text-5xl md:text-7xl font-black tracking-tight leading-[1.1] md:leading-[1.1]">
          <span className="text-slate-800 dark:text-slate-100">
            Train Smarter with
          </span>
          
          <span className="relative inline-block mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-brand-blue pb-2">
               FitSense AI
            </span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
          {t('home.subtitle')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto px-4">
           {!isAuthenticated ? (
               <Link to="/login" className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3 text-lg group">
                   Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </Link>
           ) : (
               <Link to="/dashboard" className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3 text-lg group">
                   Go to Dashboard <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
               </Link>
           )}
           <Link to="/analyze" className="px-8 py-3.5 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-white border border-gray-200 dark:border-slate-700 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 text-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
               Try AI Analysis <Camera size={20} className="text-brand-blue group-hover:scale-110 transition-transform" />
           </Link>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto w-full relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
                icon={<Camera size={28} />}
                title={t('nav.analyze')}
                desc={t('home.cards.analyze.desc')}
                variant="orange"
                to="/analyze"
            />
            <FeatureCard 
                icon={<Dumbbell size={28} />}
                title={t('nav.plan')}
                desc={t('home.cards.plan.desc')}
                variant="blue"
                to="/generate"
            />
            <FeatureCard 
                icon={<LayoutDashboard size={28} />}
                title={t('nav.dashboard')}
                desc={t('home.cards.dashboard.desc')}
                variant="grey"
                to="/dashboard"
            />
            {!isAuthenticated ? (
              <FeatureCard 
                  icon={<LogIn size={28} />}
                  title={t('nav.login')}
                  desc={t('home.cards.login.desc')}
                  variant="grey"
                  to="/login"
              />
            ) : (
              <>
                <FeatureCard 
                    icon={<User size={28} />}
                    title={t('nav.profile')}
                    desc="View achievements and stats"
                    variant="beige"
                    to="/profile"
                />
              </>
            )}
         </div>
      </section>
    </div>
  );
};

// Clean & Modern Feature Card
const FeatureCard = ({ icon, title, desc, variant, to, onClick }: any) => {
    // Variants: Orange, Blue, Grey, Beige
    const variants: Record<string, any> = {
        orange: { 
            bg: 'hover:border-primary/50', 
            iconBg: 'bg-orange-100 dark:bg-orange-500/20', 
            iconColor: 'text-primary dark:text-orange-400' 
        },
        blue: { 
            bg: 'hover:border-brand-blue/50', 
            iconBg: 'bg-blue-100 dark:bg-blue-500/20', 
            iconColor: 'text-brand-blue dark:text-blue-400' 
        },
        grey: { 
            bg: 'hover:border-slate-400/50', 
            iconBg: 'bg-slate-100 dark:bg-slate-700/50', 
            iconColor: 'text-slate-600 dark:text-slate-300' 
        },
        beige: { 
            bg: 'hover:border-yellow-600/30', 
            iconBg: 'bg-yellow-100 dark:bg-yellow-500/10', 
            iconColor: 'text-yellow-700 dark:text-yellow-500' 
        },
    };
    
    const theme = variants[variant] || variants.grey;

    const content = (
        <>
            <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center ${theme.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1 text-sm font-medium">{desc}</p>
            
            <div className={`flex items-center gap-2 text-sm font-bold ${theme.iconColor} opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-5px] group-hover:translate-x-0 duration-200`}>
                {onClick ? 'Action' : 'Open'} <ArrowRight size={16} />
            </div>
        </>
    );

    const baseClasses = `group relative rounded-3xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-white/80 dark:border-white/5 p-8 ${theme.bg} transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col h-full text-left w-full`;

    if (onClick) {
        return <button onClick={onClick} className={baseClasses}>{content}</button>;
    }
    return <Link to={to} className={baseClasses}>{content}</Link>;
};

export default Home;