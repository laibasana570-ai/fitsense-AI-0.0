
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';

export const translations = {
  en: {
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      analyze: "AI Analyze",
      plan: "Workout Plan",
      profile: "Profile",
      login: "Login",
      logout: "Logout"
    },
    home: {
      subtitle: "Your personal AI fitness coach. Perfect your form, track your progress, and achieve your goals.",
      cards: {
        dashboard: { desc: "View your activity stats and streaks" },
        analyze: { desc: "Analyze video form with Gemini AI" },
        plan: { desc: "Create personalized workout routines" },
        login: { desc: "Sign in to save your journey" }
      }
    },
    dashboard: {
      welcome: "Welcome Back 👋",
      subtitle: "Track your progress and climb the leaderboard.",
      streak: "Day Streak 🔥",
      totalWorkouts: "Total Workouts",
      totalReps: "Total Reps",
      recentBadge: "Recent Badge",
      noBadges: "No Badges Yet",
      viewAll: "View All",
      formScoreHistory: "Form Score History",
      repVolume: "Rep Volume",
      leaderboard: "Leaderboard",
      rank: "Rank",
      user: "User",
      pts: "Pts",
      updated: "Updated just now",
      viewFull: "View Full Rankings",
      noData: "No data yet"
    },
    analyze: {
      title: "AI Form Analysis",
      subtitle: "Get professional feedback on your technique instantly.",
      uploadLabel: "Upload a workout video - Gemini will count reps and check form",
      uploadText: "Click to upload video",
      uploadSubtext: "MP4, WebM, or Images (Max 10MB)",
      analyzing: "Analyzing...",
      analyzeBtn: "Analyze Workout",
      removeVideo: "Remove video",
      errorLarge: "File is too large. Please upload a shorter clip (under 10MB).",
      errorRead: "Failed to read file.",
      errorGeneric: "An unexpected error occurred.",
      reps: "Reps",
      score: "Form Score",
      status: "Status",
      completed: "Completed",
      feedback: "Detailed Feedback",
      suggestions: "Suggestions",
      share: "Share Achievement",
      loginPromo: "Log in to save your progress and earn badges!",
      introPlaceholder: "Ready to train? Upload a video to see the magic happen!",
      features: {
        reps: "Automatic Rep Counting",
        form: "Real-time Form Check",
        feedback: "Smart AI Feedback"
      },
      instructions: {
        title: "How it works",
        step1: "1. Upload Video",
        step2: "2. AI Processing",
        step3: "3. Get Feedback"
      },
      footer: "Powered by Gemini 2.5 Flash. Results are for fitness tracking only. Consult a professional for medical advice."
    },
    generator: {
      title: "Smart Plan Generator",
      subtitle: "Tell us your goals, and we'll craft the perfect routine.",
      goal: "Fitness Goal",
      level: "Fitness Level",
      days: "Days / Week",
      mins: "Mins / Session",
      equipment: "Available Equipment",
      placeholderEq: "e.g. Dumbbells, Barbell, None",
      generateBtn: "Generate Plan",
      generating: "Generating Plan...",
      resultTitle: "Your Personalized Plan",
      geminiLabel: "Gemini 3 Pro Generated",
      placeholderResult: "Your custom workout plan will appear here after you generate it.",
      age: "Age",
      focusArea: "Focus Area",
      limitations: "Injuries / Limitations",
      placeholderLim: "e.g. Knee pain, lower back, no jumping",
      focus: {
        full_body: "Full Body",
        upper_body: "Upper Body",
        lower_body: "Lower Body",
        core: "Core Strength",
        cardio: "Cardio / HIIT"
      }
    },
    profile: {
      edit: "Edit Profile",
      logout: "Logout",
      totalPoints: "Total Points",
      currentStreak: "Current Streak 🔥",
      memberSince: "Member Since",
      badges: "Badges & Achievements",
      unlocked: "Unlocked",
      days: "Days"
    },
    login: {
      join: "Join FitSense AI",
      welcome: "Welcome Back 👋",
      joinSubtitle: "Start your fitness journey today.",
      welcomeSubtitle: "Sign in to continue your progress.",
      loginBtn: "Login",
      registerBtn: "Register",
      username: "Username",
      email: "Email (Optional)",
      password: "Password",
      createAccount: "Create Account",
      signIn: "Sign In",
      placeholderUser: "Enter your username",
      placeholderPass: "••••••••",
      agreement: "By continuing, you agree to FitSense AI Terms of Service and Privacy Policy.",
      errorMissing: "Please fill in all required fields.",
      errorExists: "Username already exists.",
      errorInvalid: "Invalid username or password."
    },
    badges: {
      first_step: { name: "First Step", desc: "Complete your first workout" },
      getting_strong: { name: "Getting Strong", desc: "Complete 5 workouts" },
      dedicated: { name: "Dedicated", desc: "Complete 20 workouts" },
      rep_master: { name: "Rep Master", desc: "Accumulate 100 total reps" },
      form_perfect: { name: "Form Perfectionist", desc: "Get a form score of 9+ in 3 workouts" },
      streak_week: { name: "On Fire", desc: "Maintain a 3-day streak" }
    },
    goals: {
      "Lose Weight": "Lose Weight",
      "Build Muscle": "Build Muscle",
      "Improve Endurance": "Improve Endurance",
      "Flexibility & Mobility": "Flexibility & Mobility"
    },
    levels: {
      "Beginner": "Beginner",
      "Intermediate": "Intermediate",
      "Advanced": "Advanced"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      dashboard: "Panel",
      analyze: "Análisis IA",
      plan: "Plan de Rutina",
      profile: "Perfil",
      login: "Entrar",
      logout: "Salir"
    },
    home: {
      subtitle: "Tu entrenador personal IA. Perfecciona tu forma, sigue tu progreso y logra tus objetivos.",
      cards: {
        dashboard: { desc: "Ver estadísticas y rachas" },
        analyze: { desc: "Analizar forma con IA" },
        plan: { desc: "Crear rutinas personalizadas" },
        login: { desc: "Guarda tu progreso" }
      }
    },
    dashboard: {
      welcome: "Bienvenido de nuevo 👋",
      subtitle: "Sigue tu progreso y sube en la clasificación.",
      streak: "Racha (Días) 🔥",
      totalWorkouts: "Entrenamientos",
      totalReps: "Repeticiones",
      recentBadge: "Insignia Reciente",
      noBadges: "Sin insignias",
      viewAll: "Ver todo",
      formScoreHistory: "Historial de Puntuación",
      repVolume: "Volumen de Reps",
      leaderboard: "Clasificación",
      rank: "Rango",
      user: "Usuario",
      pts: "Pts",
      updated: "Actualizado ahora",
      viewFull: "Ver ranking completo",
      noData: "Sin datos aún"
    },
    analyze: {
      title: "Análisis de Forma IA",
      subtitle: "Recibe feedback profesional instantáneamente.",
      uploadLabel: "Sube un video de entrenamiento - Gemini contará reps y verificará forma",
      uploadText: "Clic para subir video",
      uploadSubtext: "MP4, WebM o Imágenes (Max 20MB)",
      analyzing: "Analizando...",
      analyzeBtn: "Analizar Rutina",
      removeVideo: "Quitar video",
      errorLarge: "Archivo muy grande. Sube un clip más corto (menos de 20MB).",
      errorRead: "Error al leer archivo.",
      errorGeneric: "Ocurrió un error inesperado.",
      reps: "Reps",
      score: "Puntuación",
      status: "Estado",
      completed: "Completado",
      feedback: "Comentarios Detallados",
      suggestions: "Sugerencias",
      share: "Compartir Logro",
      loginPromo: "¡Inicia sesión para guardar tu progreso y ganar insignias!",
      introPlaceholder: "Sube un video y haz clic en Analizar para ver tus reps, puntuación y comentarios de IA.",
      features: {
        reps: "Contador Automático",
        form: "Análisis de Forma",
        feedback: "Feedback IA"
      },
      instructions: {
        title: "Cómo funciona",
        step1: "1. Sube Video",
        step2: "2. Procesamiento IA",
        step3: "3. Recibe Feedback"
      },
      footer: "Desarrollado con Gemini 2.5 Flash. Resultados solo para seguimiento fitness."
    },
    generator: {
      title: "Generador Inteligente",
      subtitle: "Dile a Gemini 3 Pro tus objetivos y crearemos la rutina perfecta.",
      goal: "Objetivo",
      level: "Nivel",
      days: "Días / Semana",
      mins: "Mins / Sesión",
      equipment: "Equipo Disponible",
      placeholderEq: "ej. Mancuernas, Barra, Ninguno",
      generateBtn: "Generar Plan",
      generating: "Generando Plan...",
      resultTitle: "Tu Plan Personalizado",
      geminiLabel: "Generado por Gemini 3 Pro",
      placeholderResult: "Tu plan personalizado aparecerá aquí después de generarlo.",
      age: "Edad",
      focusArea: "Área de Enfoque",
      limitations: "Lesiones / Limitaciones",
      placeholderLim: "ej. Dolor de rodilla, espalda baja",
      focus: {
        full_body: "Cuerpo Completo",
        upper_body: "Tren Superior",
        lower_body: "Tren Inferior",
        core: "Núcleo / Core",
        cardio: "Cardio / HIIT"
      }
    },
    profile: {
      edit: "Editar Perfil",
      logout: "Cerrar Sesión",
      totalPoints: "Puntos Totales",
      currentStreak: "Racha Actual 🔥",
      memberSince: "Miembro Desde",
      badges: "Insignias y Logros",
      unlocked: "Desbloqueado",
      days: "Días"
    },
    login: {
      join: "Únete a FitSense AI",
      welcome: "Bienvenido",
      joinSubtitle: "Comienza tu viaje fitness hoy.",
      welcomeSubtitle: "Inicia sesión para continuar.",
      loginBtn: "Entrar",
      registerBtn: "Registrarse",
      username: "Usuario",
      email: "Email (Opcional)",
      password: "Contraseña",
      createAccount: "Crear Cuenta",
      signIn: "Iniciar Sesión",
      placeholderUser: "Ingresa tu usuario",
      placeholderPass: "••••••••",
      agreement: "Al continuar, aceptas los Términos y Política de Privacidad.",
      errorMissing: "Por favor completa todos los campos.",
      errorExists: "El usuario ya existe.",
      errorInvalid: "Usuario o contraseña inválidos."
    },
    badges: {
      first_step: { name: "Primer Paso", desc: "Completa tu primer entrenamiento" },
      getting_strong: { name: "Haciéndose Fuerte", desc: "Completa 5 entrenamientos" },
      dedicated: { name: "Dedicado", desc: "Completa 20 entrenamientos" },
      rep_master: { name: "Maestro de Reps", desc: "Acumula 100 repeticiones" },
      form_perfect: { name: "Perfeccionista", desc: "Obtén puntuación 9+ en 3 entrenamientos" },
      streak_week: { name: "En Llamas", desc: "Mantén una racha de 3 días" }
    },
    goals: {
      "Lose Weight": "Perder Peso",
      "Build Muscle": "Ganar Músculo",
      "Improve Endurance": "Mejorar Resistencia",
      "Flexibility & Mobility": "Flexibilidad y Movilidad"
    },
    levels: {
      "Beginner": "Principiante",
      "Intermediate": "Intermedio",
      "Advanced": "Avanzado"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      dashboard: "Tableau de bord",
      analyze: "Analyse IA",
      plan: "Programme",
      profile: "Profil",
      login: "Connexion",
      logout: "Déconnexion"
    },
    home: {
      subtitle: "Votre coach IA personnel. Perfectionnez votre forme et suivez vos progrès.",
      cards: {
        dashboard: { desc: "Voir statistiques et séries" },
        analyze: { desc: "Analyser la forme avec l'IA" },
        plan: { desc: "Créer des programmes personnalisés" },
        login: { desc: "Connectez-vous pour sauvegarder" }
      }
    },
    dashboard: {
      welcome: "Bon retour 👋",
      subtitle: "Suivez vos progrès et grimpez dans le classement.",
      streak: "Série (Jours) 🔥",
      totalWorkouts: "Entraînements",
      totalReps: "Total Répétitions",
      recentBadge: "Badge Récent",
      noBadges: "Aucun badge",
      viewAll: "Voir tout",
      formScoreHistory: "Historique du Score",
      repVolume: "Volume Répétitions",
      leaderboard: "Classement",
      rank: "Rang",
      user: "Utilisateur",
      pts: "Pts",
      updated: "Mis à jour à l'instant",
      viewFull: "Voir classement complet",
      noData: "Pas de données"
    },
    analyze: {
      title: "Analyse de Forme IA",
      subtitle: "Feedback professionnel instantané.",
      uploadLabel: "Téléchargez une vidéo - Gemini comptera les reps et vérifiera la forme",
      uploadText: "Cliquez pour télécharger",
      uploadSubtext: "MP4, WebM ou Images (Max 20MB)",
      analyzing: "Analyse en cours...",
      analyzeBtn: "Analyser l'entraînement",
      removeVideo: "Supprimer vidéo",
      errorLarge: "Fichier trop volumineux.",
      errorRead: "Erreur de lecture.",
      errorGeneric: "Une erreur est survenue.",
      reps: "Reps",
      score: "Score Forme",
      status: "Statut",
      completed: "Terminé",
      feedback: "Retours Détaillés",
      suggestions: "Suggestions",
      share: "Partager",
      loginPromo: "Connectez-vous pour sauvegarder vos progrès !",
      introPlaceholder: "Téléchargez une vidéo et cliquez sur Analyser.",
      features: {
        reps: "Comptage Automatique",
        form: "Analyse de Forme",
        feedback: "Retour IA"
      },
      instructions: {
        title: "Comment ça marche",
        step1: "1. Télécharger Vidéo",
        step2: "2. Analyse IA",
        step3: "3. Résultats"
      },
      footer: "Propulsé par Gemini 2.5 Flash. Consultez un professionnel pour des conseils médicaux."
    },
    generator: {
      title: "Générateur Intelligent",
      subtitle: "Indiquez vos objectifs à Gemini 3 Pro pour créer la routine parfaite.",
      goal: "Objectif",
      level: "Niveau",
      days: "Jours / Semaine",
      mins: "Mins / Séance",
      equipment: "Équipement",
      placeholderEq: "ex: Haltères, Barre, Aucun",
      generateBtn: "Générer Plan",
      generating: "Génération...",
      resultTitle: "Votre Plan Personnalisé",
      geminiLabel: "Généré par Gemini 3 Pro",
      placeholderResult: "Votre plan apparaîtra ici.",
      age: "Âge",
      focusArea: "Zone Ciblée",
      limitations: "Blessures / Limitations",
      placeholderLim: "ex: Douleur genou, pas de sauts",
      focus: {
        full_body: "Corps Entier",
        upper_body: "Haut du Corps",
        lower_body: "Bas du Corps",
        core: "Abdos / Core",
        cardio: "Cardio / HIIT"
      }
    },
    profile: {
      edit: "Modifier Profil",
      logout: "Déconnexion",
      totalPoints: "Points Totaux",
      currentStreak: "Série Actuelle 🔥",
      memberSince: "Membre depuis",
      badges: "Badges et Succès",
      unlocked: "Débloqué",
      days: "Jours"
    },
    login: {
      join: "Rejoindre FitSense AI",
      welcome: "Bon retour",
      joinSubtitle: "Commencez votre voyage fitness.",
      welcomeSubtitle: "Connectez-vous pour continuer.",
      loginBtn: "Connexion",
      registerBtn: "S'inscrire",
      username: "Nom d'utilisateur",
      email: "Email (Optionnel)",
      password: "Mot de passe",
      createAccount: "Créer un compte",
      signIn: "Se connecter",
      placeholderUser: "Votre nom d'utilisateur",
      placeholderPass: "••••••••",
      agreement: "En continuant, vous acceptez les conditions d'utilisation.",
      errorMissing: "Veuillez remplir tous les champs.",
      errorExists: "Ce nom d'utilisateur existe déjà.",
      errorInvalid: "Identifiants invalides."
    },
    badges: {
      first_step: { name: "Premier Pas", desc: "Terminez votre premier entraînement" },
      getting_strong: { name: "De plus en plus fort", desc: "Terminez 5 entraînements" },
      dedicated: { name: "Dédié", desc: "Terminez 20 entraînements" },
      rep_master: { name: "Maître des Reps", desc: "Cumulez 100 répétitions" },
      form_perfect: { name: "Perfectionniste", desc: "Score de 9+ dans 3 entraînements" },
      streak_week: { name: "En Feu", desc: "Maintenez une série de 3 jours" }
    },
    goals: {
      "Lose Weight": "Perdre du Poids",
      "Build Muscle": "Prendre du Muscle",
      "Improve Endurance": "Améliorer l'Endurance",
      "Flexibility & Mobility": "Flexibilité & Mobilité"
    },
    levels: {
      "Beginner": "Débutant",
      "Intermediate": "Intermédiaire",
      "Advanced": "Avancé"
    }
  },
  de: {
    nav: {
      home: "Startseite",
      dashboard: "Dashboard",
      analyze: "KI Analyse",
      plan: "Trainingsplan",
      profile: "Profil",
      login: "Anmelden",
      logout: "Abmelden"
    },
    home: {
      subtitle: "Dein persönlicher KI-Trainer. Perfektioniere deine Form und verfolge deinen Fortschritt.",
      cards: {
        dashboard: { desc: "Statistiken und Serien ansehen" },
        analyze: { desc: "Formanalyse mit KI" },
        plan: { desc: "Personalisierten Plan erstellen" },
        login: { desc: "Anmelden um zu speichern" }
      }
    },
    dashboard: {
      welcome: "Willkommen zurück 👋",
      subtitle: "Verfolge deinen Fortschritt und klettere auf der Bestenliste.",
      streak: "Tages-Serie 🔥",
      totalWorkouts: "Workouts Gesamt",
      totalReps: "Wiederholungen",
      recentBadge: "Neuestes Abzeichen",
      noBadges: "Keine Abzeichen",
      viewAll: "Alle ansehen",
      formScoreHistory: "Form-Bewertung Verlauf",
      repVolume: "Wiederholungsvolumen",
      leaderboard: "Bestenliste",
      rank: "Rang",
      user: "Benutzer",
      pts: "Pkte",
      updated: "Gerade aktualisiert",
      viewFull: "Vollständige Liste",
      noData: "Keine Daten"
    },
    analyze: {
      title: "KI Form-Analyse",
      subtitle: "Erhalte sofort professionelles Feedback.",
      uploadLabel: "Lade ein Workout-Video hoch - Gemini zählt Reps & prüft Form",
      uploadText: "Video hochladen",
      uploadSubtext: "MP4, WebM oder Bilder (Max 20MB)",
      analyzing: "Analysiere...",
      analyzeBtn: "Workout Analysieren",
      removeVideo: "Video entfernen",
      errorLarge: "Datei zu groß.",
      errorRead: "Lesefehler.",
      errorGeneric: "Ein Fehler ist aufgetreten.",
      reps: "Reps",
      score: "Form-Score",
      status: "Status",
      completed: "Abgeschlossen",
      feedback: "Detailliertes Feedback",
      suggestions: "Vorschläge",
      share: "Teilen",
      loginPromo: "Melde dich an, um deinen Fortschritt zu speichern!",
      introPlaceholder: "Video hochladen und auf Analysieren klicken.",
      features: {
        reps: "Rep-Zählung",
        form: "Form-Check",
        feedback: "KI Feedback"
      },
      instructions: {
        title: "Wie es funktioniert",
        step1: "1. Video hochladen",
        step2: "2. KI-Verarbeitung",
        step3: "3. Feedback erhalten"
      },
      footer: "Powered by Gemini 2.5 Flash. Ergebnisse nur für Fitness-Tracking."
    },
    generator: {
      title: "Smarter Plan-Generator",
      subtitle: "Nenne Gemini 3 Pro deine Ziele für den perfekten Plan.",
      goal: "Ziel",
      level: "Level",
      days: "Tage / Woche",
      mins: "Min / Einheit",
      equipment: "Ausrüstung",
      placeholderEq: "z.B. Hanteln, Langhantel, Keine",
      generateBtn: "Plan Erstellen",
      generating: "Erstelle Plan...",
      resultTitle: "Dein Persönlicher Plan",
      geminiLabel: "Generiert von Gemini 3 Pro",
      placeholderResult: "Dein Plan erscheint hier.",
      age: "Alter",
      focusArea: "Fokusbereich",
      limitations: "Verletzungen / Einschränkungen",
      placeholderLim: "z.B. Knieschmerzen, kein Springen",
      focus: {
        full_body: "Ganzkörper",
        upper_body: "Oberkörper",
        lower_body: "Unterkörper",
        core: "Rumpf / Core",
        cardio: "Ausdauer / HIIT"
      }
    },
    profile: {
      edit: "Profil bearbeiten",
      logout: "Abmelden",
      totalPoints: "Gesamtpunkte",
      currentStreak: "Aktuelle Serie 🔥",
      memberSince: "Mitglied seit",
      badges: "Abzeichen & Erfolge",
      unlocked: "Freigeschaltet",
      days: "Tage"
    },
    login: {
      join: "FitSense AI beitreten",
      welcome: "Willkommen zurück",
      joinSubtitle: "Starte deine Fitnessreise heute.",
      welcomeSubtitle: "Melde dich an, um fortzufahren.",
      loginBtn: "Anmelden",
      registerBtn: "Registrieren",
      username: "Benutzername",
      email: "E-Mail (Optional)",
      password: "Passwort",
      createAccount: "Konto erstellen",
      signIn: "Einloggen",
      placeholderUser: "Dein Benutzername",
      placeholderPass: "••••••••",
      agreement: "Mit der Fortsetzung akzeptierst du die Nutzungsbedingungen.",
      errorMissing: "Bitte alle Felder ausfüllen.",
      errorExists: "Benutzername existiert bereits.",
      errorInvalid: "Ungültige Anmeldedaten."
    },
    badges: {
      first_step: { name: "Erster Schritt", desc: "Schließe dein erstes Workout ab" },
      getting_strong: { name: "Stärker werden", desc: "Schließe 5 Workouts ab" },
      dedicated: { name: "Engagiert", desc: "Schließe 20 Workouts ab" },
      rep_master: { name: "Rep-Meister", desc: "Sammle 100 Wiederholungen" },
      form_perfect: { name: "Perfektionist", desc: "Erreiche Form-Score 9+ in 3 Workouts" },
      streak_week: { name: "Im Lauf", desc: "Halte eine 3-Tages-Serie" }
    },
    goals: {
      "Lose Weight": "Gewicht verlieren",
      "Build Muscle": "Muskeln aufbauen",
      "Improve Endurance": "Ausdauer verbessern",
      "Flexibility & Mobility": "Beweglichkeit"
    },
    levels: {
      "Beginner": "Anfänger",
      "Intermediate": "Fortgeschritten",
      "Advanced": "Profi"
    }
  },
  zh: {
    nav: {
      home: "首页",
      dashboard: "仪表板",
      analyze: "AI 分析",
      plan: "健身计划",
      profile: "个人资料",
      login: "登录",
      logout: "退出"
    },
    home: {
      subtitle: "您的私人 AI 健身教练。完善姿势，追踪进度，实现目标。",
      cards: {
        dashboard: { desc: "查看活动统计和连胜" },
        analyze: { desc: "使用 AI 分析姿势" },
        plan: { desc: "创建个性化训练计划" },
        login: { desc: "登录以保存进度" }
      }
    },
    dashboard: {
      welcome: "欢迎回来 👋",
      subtitle: "追踪你的进度并攀登排行榜。",
      streak: "连胜天数 🔥",
      totalWorkouts: "总锻炼",
      totalReps: "总次数",
      recentBadge: "最新徽章",
      noBadges: "暂无徽章",
      viewAll: "查看全部",
      formScoreHistory: "姿势评分历史",
      repVolume: "次数统计",
      leaderboard: "排行榜",
      rank: "排名",
      user: "用户",
      pts: "分",
      updated: "刚刚更新",
      viewFull: "查看完整排名",
      noData: "暂无数据"
    },
    analyze: {
      title: "AI 姿势分析",
      subtitle: "即时获取专业技术反馈。",
      uploadLabel: "上传锻炼视频 - Gemini 将计算次数并检查姿势",
      uploadText: "点击上传视频",
      uploadSubtext: "MP4, WebM 或 图片 (最大 20MB)",
      analyzing: "正在分析...",
      analyzeBtn: "分析锻炼",
      removeVideo: "移除视频",
      errorLarge: "文件过大。请上传较短的片段（20MB以内）。",
      errorRead: "读取文件失败。",
      errorGeneric: "发生意外错误。",
      reps: "次数",
      score: "姿势评分",
      status: "状态",
      completed: "已完成",
      feedback: "详细反馈",
      suggestions: "建议",
      share: "分享成就",
      loginPromo: "登录以保存进度并赢取徽章！",
      introPlaceholder: "上传视频并点击分析以查看次数、评分和 AI 反馈。",
      features: {
        reps: "自动计数",
        form: "姿势检查",
        feedback: "AI 反馈"
      },
      instructions: {
        title: "工作原理",
        step1: "1. 上传视频",
        step2: "2. AI 处理",
        step3: "3. 获取反馈"
      },
      footer: "由 Gemini 2.5 Flash 驱动。结果仅供健身参考。"
    },
    generator: {
      title: "智能计划生成器",
      subtitle: "告诉 Gemini 3 Pro 你的目标，我们将为你打造完美计划。",
      goal: "健身目标",
      level: "健身水平",
      days: "天数 / 周",
      mins: "分钟 / 节",
      equipment: "可用设备",
      placeholderEq: "例如：哑铃，杠铃，无",
      generateBtn: "生成计划",
      generating: "正在生成计划...",
      resultTitle: "你的个性化计划",
      geminiLabel: "由 Gemini 3 Pro 生成",
      placeholderResult: "你的定制计划将在生成后显示在此处。",
      age: "年龄",
      focusArea: "重点部位",
      limitations: "伤病 / 限制",
      placeholderLim: "例如：膝盖痛，下背痛",
      focus: {
        full_body: "全身",
        upper_body: "上半身",
        lower_body: "下半身",
        core: "核心",
        cardio: "有氧 / HIIT"
      }
    },
    profile: {
      edit: "编辑资料",
      logout: "退出登录",
      totalPoints: "总积分",
      currentStreak: "当前连胜 🔥",
      memberSince: "加入时间",
      badges: "徽章与成就",
      unlocked: "已解锁",
      days: "天"
    },
    login: {
      join: "加入 FitSense AI",
      welcome: "欢迎回来",
      joinSubtitle: "今天开始你的健身之旅。",
      welcomeSubtitle: "登录以继续。",
      loginBtn: "登录",
      registerBtn: "注册",
      username: "用户名",
      email: "邮箱 (可选)",
      password: "密码",
      createAccount: "创建账户",
      signIn: "登录",
      placeholderUser: "输入用户名",
      placeholderPass: "••••••••",
      agreement: "继续即表示你同意 FitSense AI 的服务条款和隐私政策。",
      errorMissing: "请填写所有必填项。",
      errorExists: "用户名已存在。",
      errorInvalid: "用户名或密码无效。"
    },
    badges: {
      first_step: { name: "第一步", desc: "完成你的第一次锻炼" },
      getting_strong: { name: "变强", desc: "完成 5 次锻炼" },
      dedicated: { name: "专注", desc: "完成 20 次锻炼" },
      rep_master: { name: "次数大师", desc: "累计 100 次动作" },
      form_perfect: { name: "完美主义者", desc: "在 3 次锻炼中获得 9+ 评分" },
      streak_week: { name: "火力全开", desc: "保持 3 天连胜" }
    },
    goals: {
      "Lose Weight": "减肥",
      "Build Muscle": "增肌",
      "Improve Endurance": "提高耐力",
      "Flexibility & Mobility": "柔韧性与灵活性"
    },
    levels: {
      "Beginner": "初学者",
      "Intermediate": "中级",
      "Advanced": "高级"
    }
  }
};