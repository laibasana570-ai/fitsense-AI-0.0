import React, { useState, useRef, useContext } from 'react';
import { Upload, CheckCircle, AlertCircle, Play, Loader2, RotateCcw, Activity, Share2, Facebook, Twitter, Info, Zap, Trash2, FileVideo } from 'lucide-react';
import { analyzeWorkoutVideo } from '../services/geminiService';
import { saveWorkoutLog } from '../services/storageService';
import { AnalysisResult } from '../types';
import { AuthContext, LanguageContext, ToastContext } from '../contexts';
import { Link } from 'react-router-dom';

const VideoAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { isAuthenticated } = useContext(AuthContext);
  const { t, language } = useContext(LanguageContext);
  const { showToast } = useContext(ToastContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        const msg = t('analyze.errorLarge');
        setError(msg);
        showToast(msg, 'error');
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        if (!base64String || !base64String.includes(',')) {
             const msg = t('analyze.errorRead');
             setError(msg);
             showToast(msg, 'error');
             setIsAnalyzing(false);
             return;
        }
        
        const base64Data = base64String.split(',')[1];
        const mimeType = file.type;

        try {
          const analysis = await analyzeWorkoutVideo(base64Data, mimeType, language);
          setResult(analysis);
          showToast('Analysis complete! Great work.', 'success');
          
          if (isAuthenticated) {
            saveWorkoutLog({
              date: new Date().toISOString(),
              exerciseName: analysis.exerciseName,
              repCount: analysis.repCount,
              formScore: analysis.formScore,
              feedback: analysis.feedback
            });
          }
        } catch (err: any) {
          console.error("Analysis Failed:", err);
          const msg = err.message || t('analyze.errorGeneric');
          setError(msg);
          showToast(msg, 'error');
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.onerror = () => {
        const msg = t('analyze.errorRead');
        setError(msg);
        showToast(msg, 'error');
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error("File Reader Error:", e);
      const msg = t('analyze.errorGeneric');
      setError(msg);
      showToast(msg, 'error');
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    // Explicitly pause and clear video to prevent background audio issues
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
      videoRef.current.load();
    }
    
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const shareResult = (platform: 'twitter' | 'facebook' | 'native') => {
    if (!result) return;
    const text = `I just completed ${result.repCount} reps of ${result.exerciseName} with a form score of ${result.formScore}/10 on FitSense AI! 🏋️‍♂️ #FitSenseAI #Workout`;
    const url = window.location.href; 
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'native') {
      if (navigator.share) {
        navigator.share({ title: 'FitSense AI Workout', text: text, url: url }).catch(console.error);
      } else {
        alert("Native sharing is not supported on this browser.");
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white inline-block">
          {t('analyze.title')}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">{t('analyze.subtitle')}</p>
      </header>

      {/* Instruction Panel */}
      <div className="glass-card rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-primary/10 shadow-sm bg-gradient-to-r from-orange-50/50 to-white/50 dark:from-orange-900/10 dark:to-gray-900/10">
         <div className="flex items-center gap-2 font-bold text-primary">
            <Info size={20} /> <span className="uppercase tracking-wider text-xs md:text-sm">{t('analyze.instructions.title')}</span>
         </div>
         <div className="flex gap-4 md:gap-8 text-sm font-medium text-gray-600 dark:text-gray-300 flex-wrap justify-center">
            <span className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
               {t('analyze.instructions.step1')}
            </span>
            <span className="hidden md:inline text-gray-300">→</span>
            <span className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
               {t('analyze.instructions.step2')}
            </span>
            <span className="hidden md:inline text-gray-300">→</span>
            <span className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
               {t('analyze.instructions.step3')}
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[500px]">
        {/* Upload & Preview Section */}
        <div className="space-y-4">
          
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
             {t('analyze.uploadLabel')}
          </label>

          {!file ? (
            <div className="group relative rounded-xl p-1 bg-gray-200 dark:bg-gray-800 hover:bg-primary transition-colors duration-300 shadow-lg cursor-pointer">
              <div className="bg-gray-50 dark:bg-[#0B1120] rounded-lg h-96 flex flex-col items-center justify-center relative overflow-hidden transition-colors">
                {/* Simple Pattern */}
                <div className="absolute inset-0 opacity-5" 
                     style={{backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px'}}>
                </div>
                
                <input 
                  type="file" 
                  accept="video/*,image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full h-full"
                  onChange={handleFileChange}
                />
                
                <div className="p-6 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-all duration-300 relative z-10 transform group-hover:scale-110">
                  <Upload className="text-primary w-10 h-10" />
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 relative z-10">{t('analyze.uploadText')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 relative z-10">
                  {t('analyze.uploadSubtext')}
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-gray-800 group h-80 md:h-96">
                {file.type.startsWith('video') ? (
                  <video 
                    ref={videoRef}
                    src={previewUrl!} 
                    controls 
                    className={`w-full h-full object-contain bg-black/50 backdrop-blur-xl ${isAnalyzing ? 'opacity-50 grayscale' : ''} transition-all duration-500`}
                  />
                ) : (
                  <img 
                    src={previewUrl!} 
                    alt="Preview" 
                    className={`w-full h-full object-contain bg-black/50 backdrop-blur-xl ${isAnalyzing ? 'opacity-50 grayscale' : ''} transition-all duration-500`}
                  />
                )}
                
                {/* Prominent Remove Button - Only show if not analyzing */}
                {!isAnalyzing && (
                  <button 
                    onClick={reset}
                    className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all z-50 hover:scale-105 border border-red-400/20 backdrop-blur-sm"
                    aria-label={t('analyze.removeVideo')}
                  >
                    <Trash2 size={18} />
                    <span>{t('analyze.removeVideo')}</span>
                  </button>
                )}

                {/* File Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <span className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md text-white/90 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/10">
                       <FileVideo size={14} /> {file.name}
                    </span>
                </div>
              </div>

              {/* Action Buttons */}
              {!result && (
                isAnalyzing ? (
                  <div className="w-full py-6 bg-white dark:bg-gray-800 border border-primary/20 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 animate-fade-in">
                      <div className="relative">
                          <div className="w-12 h-12 rounded-full border-4 border-gray-100 dark:border-gray-700 border-t-primary animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                              <Zap size={16} className="text-primary fill-current animate-pulse" />
                          </div>
                      </div>
                      <div className="space-y-2 text-center w-full max-w-xs px-4">
                          <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                               {t('analyze.analyzing')}
                               <span className="flex gap-1">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                               </span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                               <div className="h-full bg-primary w-2/3 rounded-full animate-pulse"></div>
                          </div>
                          <p className="text-xs text-gray-400 font-medium pt-1">Identifying exercise & counting reps...</p>
                      </div>
                  </div>
                ) : (
                  <button
                    onClick={handleAnalyze}
                    className="w-full py-5 bg-primary hover:bg-primary-hover text-white font-extrabold text-xl rounded-2xl transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 border border-primary/50"
                  >
                    <Play size={28} fill="currentColor" /> {t('analyze.analyzeBtn')}
                  </button>
                )
              )}
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-3 animate-fade-in">
              <AlertCircle size={22} className="shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className={`glass-card rounded-xl p-1 border border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-500 ${result ? 'bg-white dark:bg-gray-800' : 'bg-transparent'}`}>
            <div className={`h-full rounded-lg p-6 md:p-8 flex flex-col ${result ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-900'}`}>
              {!result ? (
                <div className="h-full flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 space-y-8 min-h-[400px]">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                    <Activity size={64} className="opacity-50 relative z-10 text-primary" />
                  </div>
                  
                  <div className="text-center space-y-6 max-w-sm">
                      <p className="text-xl font-bold text-gray-800 dark:text-gray-200 leading-relaxed">
                        {t('analyze.introPlaceholder')}
                      </p>
                      
                      <div className="grid grid-cols-1 gap-3">
                          <div className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-transform">
                             <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">🔢</div>
                             <span className="font-semibold text-gray-700 dark:text-gray-200">{t('analyze.features.reps') || 'Automatic Rep Counting'}</span>
                          </div>
                          <div className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-transform">
                             <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-lg">✅</div>
                             <span className="font-semibold text-gray-700 dark:text-gray-200">{t('analyze.features.form') || 'Real-time Form Analysis'}</span>
                          </div>
                          <div className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-transform">
                             <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg">🤖</div>
                             <span className="font-semibold text-gray-700 dark:text-gray-200">{t('analyze.features.feedback') || 'Smart AI Feedback'}</span>
                          </div>
                      </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-fade-in-up flex-1">
                  <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700/50 pb-6">
                    <div>
                      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{result.exerciseName}</h2>
                      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full w-fit">
                        <CheckCircle size={14} /> Analysis Complete
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-black text-primary">{result.repCount}</div>
                      <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">{t('analyze.reps')}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-1 ${result.formScore >= 8 ? 'bg-green-500' : result.formScore >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-2">{t('analyze.score')}</div>
                      <div className={`text-4xl font-black ${
                        result.formScore >= 8 ? 'text-green-500' : 
                        result.formScore >= 5 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {result.formScore}<span className="text-lg text-gray-400 font-normal">/10</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-2">{t('analyze.status')}</div>
                      <div className="text-2xl font-bold text-blue-500 mt-1 flex items-center justify-center gap-2">
                        <CheckCircle size={24} /> {t('analyze.completed')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                      <div className="p-1.5 bg-primary/20 rounded-lg text-primary"><Zap size={18} /></div>
                      {t('analyze.feedback')}
                    </h3>
                    <ul className="space-y-3">
                      {result.feedback.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50">
                          <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                          <span className="leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {result.suggestions && result.suggestions.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                          <div className="p-1.5 bg-secondary/20 rounded-lg text-secondary"><Info size={18} /></div>
                          {t('analyze.suggestions')}
                        </h3>
                        <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5">
                            <ul className="space-y-3">
                            {result.suggestions.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></div>
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                  )}

                  <div className="pt-6 mt-4 border-t border-gray-200 dark:border-gray-800">
                    {!isAuthenticated && (
                      <div className="mb-6 p-4 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-sm rounded-lg flex items-center gap-3 border border-yellow-500/20">
                        <Info size={20} className="shrink-0" />
                        <span>
                          <Link to="/login" className="font-bold hover:underline">Log in</Link> {t('analyze.loginPromo').replace('Log in', '')}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest text-center">{t('analyze.share')}</h3>
                    <div className="flex gap-3">
                        <button 
                          onClick={() => shareResult('twitter')}
                          className="flex-1 bg-black hover:bg-gray-900 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md text-sm font-semibold"
                        >
                            <Twitter size={16} /> Twitter
                        </button>
                        <button 
                          onClick={() => shareResult('facebook')}
                          className="flex-1 bg-[#1877F2] hover:bg-[#155fc4] text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md text-sm font-semibold"
                        >
                            <Facebook size={16} /> Facebook
                        </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
      <footer className="text-center text-xs text-gray-400 dark:text-gray-600 mt-12 pb-4 pt-8 border-t border-gray-200 dark:border-gray-800/50">
         {t('analyze.footer')}
      </footer>
    </div>
  );
};

export default VideoAnalyzer;