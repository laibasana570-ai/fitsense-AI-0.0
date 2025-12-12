import React, { useEffect, useState, useContext } from 'react';
import { getWorkoutLogs, calculateStreak, getLeaderboard, getBadges } from '../services/storageService';
import { WorkoutLog, LeaderboardEntry, Badge } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Trophy, Flame, CalendarDays, Activity, Crown, Medal, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext, LanguageContext } from '../contexts';

const Dashboard: React.FC = () => {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [streak, setStreak] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [recentBadge, setRecentBadge] = useState<Badge | null>(null);
  const { isDark } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const data = getWorkoutLogs();
    setLogs(data);
    setStreak(calculateStreak());
    setLeaderboard(getLeaderboard());
    
    const badges = getBadges();
    const unlocked = badges.filter(b => b.unlocked);
    if (unlocked.length > 0) {
      setRecentBadge(unlocked[unlocked.length - 1]);
    }
  }, []);

  const totalWorkouts = logs.length;
  const totalReps = logs.reduce((acc, log) => acc + log.repCount, 0);

  // Stats for charts
  const chartData = [...logs].reverse().slice(-7).map(log => ({
    date: new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: log.formScore,
    reps: log.repCount
  }));

  const chartTextColor = isDark ? '#94a3b8' : '#64748b';
  const chartGridColor = isDark ? '#1e293b' : '#e2e8f0';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#cbd5e1';

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            {t('dashboard.welcome')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-5 py-3 rounded-2xl border border-orange-500/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          <div className="relative">
             <div className="absolute inset-0 bg-orange-500 blur-lg opacity-40 animate-pulse"></div>
             <Flame className="text-orange-500 relative z-10" fill="currentColor" size={28} />
          </div>
          <div>
            <span className="text-3xl font-black text-orange-600 dark:text-orange-400 leading-none">{streak}</span>
            <span className="text-xs uppercase font-bold text-orange-600/70 dark:text-orange-400/70 ml-1.5">{t('dashboard.streak')}</span>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl shadow-lg shadow-gray-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 bg-gradient-to-bl from-secondary/10 to-transparent rounded-bl-full"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/5 text-secondary rounded-2xl shadow-inner ring-1 ring-secondary/20 group-hover:scale-110 transition-transform duration-500">
              <Trophy size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wide">{t('dashboard.totalWorkouts')}</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white mt-1">{totalWorkouts}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl shadow-lg shadow-gray-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 text-primary rounded-2xl shadow-inner ring-1 ring-primary/20 group-hover:scale-110 transition-transform duration-500">
              <Activity size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wide">{t('dashboard.totalReps')}</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white mt-1">{totalReps}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl shadow-lg shadow-gray-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 opacity-5 dark:opacity-10 rotate-12 transition-transform group-hover:rotate-45 duration-700">
            <Crown size={140} className="text-gray-900 dark:text-white" />
          </div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="p-4 bg-gradient-to-br from-yellow-400/20 to-yellow-600/5 text-yellow-500 rounded-2xl shadow-inner ring-1 ring-yellow-500/20 group-hover:scale-110 transition-transform duration-500">
              <Medal size={32} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wide">{t('dashboard.recentBadge')}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white truncate mt-1">
                {recentBadge ? t(`badges.${recentBadge.id}.name`) : t('dashboard.noBadges')}
              </p>
              {recentBadge && (
                  <Link to="/profile" className="inline-flex items-center gap-1 text-xs font-bold text-yellow-600 dark:text-yellow-400 mt-1 hover:underline">
                      {t('dashboard.viewAll')} <ArrowUpRight size={12} />
                  </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-8 rounded-3xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <TrendingUp size={20} />
                        </div>
                        {t('dashboard.formScoreHistory')}
                    </h3>
                </div>
                <div className="h-72 w-full">
                    {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} opacity={0.5} vertical={false} />
                        <XAxis dataKey="date" stroke={chartTextColor} fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis stroke={chartTextColor} domain={[0, 10]} fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: tooltipBg, 
                                borderColor: tooltipBorder, 
                                color: isDark ? '#fff' : '#000',
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#06b6d4" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorScore)" 
                        />
                        </AreaChart>
                    </ResponsiveContainer>
                    ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                        {t('dashboard.noData')}
                    </div>
                    )}
                </div>
            </div>

            <div className="glass-card p-8 rounded-3xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                            <Activity size={20} />
                        </div>
                        {t('dashboard.repVolume')}
                    </h3>
                </div>
                <div className="h-72 w-full">
                    {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} vertical={false} opacity={0.5} />
                        <XAxis dataKey="date" stroke={chartTextColor} fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis stroke={chartTextColor} fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                        <Tooltip 
                            cursor={{ fill: isDark ? '#ffffff10' : '#00000005', radius: 4 }}
                            contentStyle={{ 
                                backgroundColor: tooltipBg, 
                                borderColor: tooltipBorder, 
                                color: isDark ? '#fff' : '#000',
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Bar dataKey="reps" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                        </BarChart>
                    </ResponsiveContainer>
                    ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                        {t('dashboard.noData')}
                    </div>
                    )}
                </div>
            </div>
        </div>

        {/* Leaderboard Section */}
        <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl shadow-xl dark:shadow-none h-full overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <div className="p-2 bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 rounded-lg">
                            <Crown size={20} />
                        </div>
                        {t('dashboard.leaderboard')}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pl-11">{t('dashboard.updated')}</p>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                    <table className="w-full text-left border-collapse">
                        <tbody className="text-sm">
                            {leaderboard.map((entry, idx) => (
                                <tr key={entry.username} className={`
                                    group transition-all duration-200 rounded-xl overflow-hidden
                                    ${entry.isCurrentUser ? 'bg-primary/10 border-primary/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                                `}>
                                    <td className="px-4 py-4 rounded-l-xl">
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-xs
                                            ${entry.rank === 1 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400 ring-1 ring-yellow-400/50' : 
                                              entry.rank === 2 ? 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300 ring-1 ring-gray-400/50' : 
                                              entry.rank === 3 ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 ring-1 ring-orange-400/50' : 
                                              'text-gray-400 bg-gray-50 dark:bg-gray-800'}
                                        `}>
                                            {entry.rank}
                                        </div>
                                    </td>
                                    <td className="px-2 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${entry.isCurrentUser ? 'bg-primary animate-pulse' : 'bg-transparent'}`}></div>
                                            <span className={`font-semibold ${entry.isCurrentUser ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                                                {entry.username}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right rounded-r-xl">
                                        <span className="font-mono font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs">
                                            {entry.points}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm">
                     <Link to="/profile" className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-sm font-bold rounded-xl transition-all shadow-sm text-gray-800 dark:text-white group">
                        {t('dashboard.viewFull')} <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                     </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;