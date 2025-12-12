import React, { useState, useEffect, useContext } from 'react';
import { UserProfile, Badge } from '../types';
import { getUserProfile, getBadges, calculateStreak, logoutUser } from '../services/storageService';
import { AuthContext, LanguageContext } from '../contexts';
import { Navigate } from 'react-router-dom';
import { Award, Flame, Star, Trophy, Footprints, Dumbbell, Layers, LogOut, Settings, Calendar, Mail, Check } from 'lucide-react';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [streak, setStreak] = useState(0);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const userProfile = getUserProfile();
    if (userProfile) {
      setProfile(userProfile);
      setBadges(getBadges());
      setStreak(calculateStreak());
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  const getIcon = (iconName: string) => {
      switch(iconName) {
          case 'Footprints': return <Footprints size={24} />;
          case 'Dumbbell': return <Dumbbell size={24} />;
          case 'Trophy': return <Trophy size={24} />;
          case 'Layers': return <Layers size={24} />;
          case 'Star': return <Star size={24} />;
          case 'Flame': return <Flame size={24} />;
          default: return <Award size={24} />;
      }
  };

  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }

  if (!profile) {
      return (
        <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Profile Header */}
      <div className="glass-card rounded-3xl p-0 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden">
        {/* Vibrant Gradient Background */}
        <div className="h-40 bg-gradient-to-r from-primary via-blue-500 to-secondary relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute top-0 right-0 p-10 bg-white/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
                <div className="w-32 h-32 bg-gray-900 dark:bg-black rounded-full p-1.5 ring-4 ring-white dark:ring-gray-900 shadow-2xl z-10">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-5xl font-bold text-white uppercase">
                        {profile.username.charAt(0)}
                    </div>
                </div>
                
                <div className="text-center md:text-left flex-1 mb-2">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">{profile.username}</h1>
                     {profile.email && (
                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-gray-400 font-medium">
                            <Mail size={16} />
                            <span>{profile.email}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-2">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700/50">
                        <Settings size={18} /> {t('profile.edit')}
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-sm font-bold hover:bg-red-500/20 transition-colors border border-red-500/20"
                    >
                        <LogOut size={18} /> {t('profile.logout')}
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg flex items-center gap-5 group hover:border-primary/30 transition-all duration-300">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Trophy size={32} />
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{t('profile.totalPoints')}</p>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">{profile.totalPoints}</p>
            </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg flex items-center gap-5 group hover:border-orange-500/30 transition-all duration-300">
            <div className="p-4 bg-orange-500/10 text-orange-500 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Flame size={32} fill="currentColor" />
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{t('profile.currentStreak')}</p>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">{streak} {t('profile.days')}</p>
            </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg flex items-center gap-5 group hover:border-blue-500/30 transition-all duration-300">
            <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Calendar size={32} />
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{t('profile.memberSince')}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                    {new Date(profile.joinedDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </p>
            </div>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-1.5 bg-secondary/10 rounded-lg text-secondary">
                     <Award size={20} /> 
                </div>
                {t('profile.badges')}
            </h2>
            <span className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full font-bold">
                {badges.filter(b => b.unlocked).length} / {badges.length} {t('profile.unlocked')}
            </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
                <div 
                    key={badge.id}
                    className={`
                        relative p-6 rounded-3xl border flex items-start gap-5 transition-all duration-500 overflow-hidden group
                        ${badge.unlocked 
                            ? 'glass-card border-primary/20 shadow-lg dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50' 
                            : 'bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60 grayscale hover:opacity-100 hover:grayscale-0'
                        }
                    `}
                >
                    {badge.unlocked && <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none"></div>}
                    
                    <div className={`
                        p-3.5 rounded-2xl shrink-0 transition-transform duration-500 group-hover:scale-110
                        ${badge.unlocked 
                            ? 'bg-gradient-to-br from-primary to-blue-500 text-white shadow-lg shadow-primary/30' 
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600'}
                    `}>
                        {getIcon(badge.icon)}
                    </div>
                    <div className="flex-1 relative z-10">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className={`font-bold text-lg ${badge.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>
                                {t(`badges.${badge.id}.name`)}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{t(`badges.${badge.id}.desc`)}</p>
                        
                        {badge.unlocked && (
                            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                                <Check size={14} strokeWidth={3} />
                                {t('profile.unlocked')}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;