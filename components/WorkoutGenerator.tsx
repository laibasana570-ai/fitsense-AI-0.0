import React, { useState, useContext } from 'react';
import { UserGoal, FitnessLevel } from '../types';
import { generatePersonalizedPlan } from '../services/geminiService';
import { saveWorkoutPlan, getWorkoutPlan } from '../services/storageService';
import { Calendar, Clock, Dumbbell, Sparkles, Loader2, Save, User, Target, AlertCircle, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { LanguageContext, ToastContext } from '../contexts';

const MarkdownRenderer = ({ content }: { content: string }) => {
    const cleanContent = content.replace(/```markdown/g, '').replace(/```/g, '');
    
    return (
        <div className="prose prose-sm md:prose-base dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-strong:text-primary max-w-none">
             <ReactMarkdown>{cleanContent}</ReactMarkdown>
        </div>
    );
};

const WorkoutGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(getWorkoutPlan());
  const { t, language } = useContext(LanguageContext);
  const { showToast } = useContext(ToastContext);
  
  const [goal, setGoal] = useState<UserGoal>(UserGoal.BUILD_MUSCLE);
  const [level, setLevel] = useState<FitnessLevel>(FitnessLevel.BEGINNER);
  const [days, setDays] = useState(3);
  const [time, setTime] = useState(45);
  const [equipment, setEquipment] = useState("");
  const [age, setAge] = useState<number | ''>('');
  const [focusArea, setFocusArea] = useState('full_body');
  const [limitations, setLimitations] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedPlan(null);

    try {
      const plan = await generatePersonalizedPlan({
        goal,
        level,
        daysPerWeek: days,
        durationMinutes: time,
        equipment: equipment || "None",
        age: age === '' ? undefined : age,
        focusArea,
        limitations
      }, language);
      setGeneratedPlan(plan);
      saveWorkoutPlan(plan);
      showToast('Workout plan generated successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Failed to generate plan. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const focusOptions = [
    { value: 'full_body', label: t('generator.focus.full_body') },
    { value: 'upper_body', label: t('generator.focus.upper_body') },
    { value: 'lower_body', label: t('generator.focus.lower_body') },
    { value: 'core', label: t('generator.focus.core') },
    { value: 'cardio', label: t('generator.focus.cardio') },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <header className="text-center md:text-left">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white inline-block">
            {t('generator.title')}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">{t('generator.subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-2xl shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-800 space-y-8 relative overflow-hidden">
            
            {/* Goal */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">{t('generator.goal')}</label>
              <div className="space-y-2.5">
                {Object.values(UserGoal).map((g) => (
                  <label key={g} className={`group flex items-center p-3.5 rounded-lg border cursor-pointer transition-all duration-200 ${goal === g ? 'bg-primary/5 border-primary text-gray-900 dark:text-white shadow-sm' : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                    <input 
                      type="radio" 
                      name="goal" 
                      value={g} 
                      checked={goal === g}
                      onChange={() => setGoal(g)}
                      className="hidden" 
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${goal === g ? 'border-primary' : 'border-gray-400'}`}>
                        {goal === g && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                    </div>
                    <span className="font-semibold text-sm">{t(`goals.${g}`)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700/50"></div>

            {/* Level & Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t('generator.level')}</label>
                <div className="relative">
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value as FitnessLevel)}
                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 px-3 appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium text-sm"
                  >
                    {Object.values(FitnessLevel).map(l => (
                      <option key={l} value={l}>{t(`levels.${l}`)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t('generator.age')}</label>
                 <div className="relative group">
                    <User className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="number" 
                      min={10} max={100} 
                      value={age}
                      onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value))}
                      className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium placeholder:text-gray-400 text-sm"
                      placeholder="--"
                    />
                 </div>
              </div>
            </div>
            
            {/* Focus Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t('generator.focusArea')}</label>
              <div className="relative group">
                  <Target className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <select 
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-10 pr-8 appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium text-sm"
                  >
                    {focusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
              </div>
            </div>

            {/* Days & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t('generator.days')}</label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="number" 
                    min={1} max={7} 
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t('generator.mins')}</label>
                <div className="relative group">
                  <Clock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="number" 
                    min={10} max={180} 
                    value={time}
                    onChange={(e) => setTime(parseInt(e.target.value))}
                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t('generator.equipment')}</label>
              <div className="relative group">
                <Dumbbell className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  placeholder={t('generator.placeholderEq')}
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>
            
            {/* Limitations */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t('generator.limitations')}</label>
              <div className="relative group">
                <AlertCircle className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  value={limitations}
                  onChange={(e) => setLimitations(e.target.value)}
                  placeholder={t('generator.placeholderLim')}
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold text-lg rounded-xl transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> {t('generator.generating')}
                </>
              ) : (
                <>
                  <Sparkles size={20} fill="currentColor" /> {t('generator.generateBtn')}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
           {generatedPlan ? (
             <div className="glass-card rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl animate-fade-in relative overflow-hidden h-full">
               <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
               <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-primary text-white rounded-lg shadow-md">
                         <Sparkles size={20} fill="white" />
                    </div>
                    {t('generator.resultTitle')}
                 </h2>
                 <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 font-bold uppercase tracking-wide">Gemini 3 Pro</span>
               </div>
               <div className="h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                 <MarkdownRenderer content={generatedPlan} />
               </div>
             </div>
           ) : (
             <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700/50 relative overflow-hidden">
               <div className="p-6 bg-white dark:bg-gray-800 rounded-full mb-6 shadow-md relative z-10">
                   <Sparkles size={48} className="text-gray-300 dark:text-gray-600" />
               </div>
               <p className="max-w-md text-center text-lg font-medium relative z-10">{t('generator.placeholderResult')}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutGenerator;