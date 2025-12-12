import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Camera, Dumbbell, Activity, User, Sun, Moon, LogIn, LogOut, Home } from 'lucide-react';
import { ThemeContext, AuthContext, LanguageContext } from '../contexts';
import { Language } from '../services/translations';
import { logoutUser } from '../services/storageService';

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { to: "/", icon: <Home size={18} />, label: t('nav.home') },
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: t('nav.dashboard') },
    { to: "/analyze", icon: <Camera size={18} />, label: t('nav.analyze') },
    { to: "/generate", icon: <Dumbbell size={18} />, label: t('nav.plan') },
    { 
      to: isAuthenticated ? "/profile" : "/login", 
      icon: isAuthenticated ? <User size={18} /> : <LogIn size={18} />, 
      label: isAuthenticated ? t('nav.profile') : t('nav.login') 
    },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  const LangMenu = () => (
    <div className="relative" ref={langMenuRef}>
      <button 
        onClick={() => setShowLangMenu(!showLangMenu)}
        className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
      >
        <span className="text-xl leading-none grayscale hover:grayscale-0 transition-all">{languages.find(l => l.code === language)?.flag}</span>
      </button>

      {showLangMenu && (
        <div className="absolute top-full right-0 mt-2 w-44 glass-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden animate-fade-in z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setShowLangMenu(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-brand-blue/5 transition-colors ${language === lang.code ? 'text-brand-blue font-semibold bg-brand-blue/10' : 'text-slate-700 dark:text-slate-300'}`}
            >
              <span>{lang.label}</span>
              <span className="text-lg">{lang.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* DESKTOP TOP MENU BAR */}
      <div className="fixed top-0 left-0 right-0 h-16 md:h-20 z-50 px-4 md:px-8 flex items-center justify-between shadow-soft border-b border-white/60 dark:border-white/5 backdrop-blur-xl bg-white/80 dark:bg-[#0B1120]/80">
        
        {/* Left Side: Logo + Nav Links */}
        <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
                <div className="relative bg-gradient-to-br from-primary to-orange-500 p-2 rounded-xl text-white shadow-glow group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                    <Activity size={24} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-white leading-none">
                        FitSense<span className="text-primary font-black">.AI</span>
                    </span>
                </div>
            </Link>

            {/* Desktop Navigation Links - Left Aligned */}
            <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                    <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 text-sm font-semibold ${
                        isActive
                            ? 'text-white bg-primary shadow-glow'
                            : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                        }`
                    }
                    >
                    {item.icon}
                    <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2">
          <LangMenu />
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
          >
            {isDark ? <Moon size={20} className="text-brand-blue" /> : <Sun size={20} className="text-orange-500" />}
          </button>
          
          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-sm font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all border border-red-100 dark:border-red-500/10 ml-2"
              title={t('nav.logout')}
            >
              <LogOut size={16} />
              <span className="hidden md:inline">{t('nav.logout')}</span>
            </button>
          )}
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass border-t border-gray-200 dark:border-slate-800 z-50 flex items-center justify-around pb-safe px-2 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-xl">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-primary scale-110'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Navbar;