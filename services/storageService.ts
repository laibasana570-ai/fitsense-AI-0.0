
import { WorkoutLog, UserProfile, Badge, LeaderboardEntry } from '../types';

const LOGS_KEY = 'fitsense_workout_logs';
const PLAN_KEY = 'fitsense_current_plan'; // Note: Plan is currently shared/local only, could be user-specific in future
const USERS_KEY = 'fitsense_users';
const CURRENT_USER_KEY = 'fitsense_active_user';

// --- Auth & User Management ---

export const getAllUsers = (): Record<string, UserProfile> => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
};

export const getCurrentUsername = (): string | null => {
  return localStorage.getItem(CURRENT_USER_KEY);
};

export const getUserProfile = (): UserProfile | null => {
  const username = getCurrentUsername();
  if (!username) return null;
  const users = getAllUsers();
  return users[username] || null;
};

export const registerUser = (username: string, password?: string, email?: string): boolean => {
  const users = getAllUsers();
  if (users[username]) {
    return false; // User exists
  }

  const newUser: UserProfile = {
    username,
    password, // In a real app, hash this!
    email,
    joinedDate: new Date().toISOString(),
    totalPoints: 0
  };

  users[username] = newUser;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, username);
  return true;
};

export const loginUser = (username: string, password?: string): boolean => {
  const users = getAllUsers();
  const user = users[username];
  
  // Simple check (password optional for legacy/quick profiles)
  if (user && (!user.password || user.password === password)) {
    localStorage.setItem(CURRENT_USER_KEY, username);
    return true;
  }
  return false;
};

export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const saveUserProfile = (profile: UserProfile): void => {
  const users = getAllUsers();
  users[profile.username] = profile;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // If we are updating the currently logged in user (or just created one), ensure session is set
  if (getCurrentUsername() === profile.username) {
      // no-op, already set
  }
};

export const updateUserPoints = (points: number): void => {
  const profile = getUserProfile();
  if (profile) {
    profile.totalPoints += points;
    saveUserProfile(profile);
  }
};

// --- Core Storage (User Scoped) ---

export const getWorkoutLogs = (): WorkoutLog[] => {
  try {
    const data = localStorage.getItem(LOGS_KEY);
    const allLogs: WorkoutLog[] = data ? JSON.parse(data) : [];
    
    const currentUser = getCurrentUsername();
    if (!currentUser) return []; // No logs if not logged in (or could return guest logs)

    return allLogs.filter(log => log.userId === currentUser);
  } catch (e) {
    console.error("Failed to parse logs", e);
    return [];
  }
};

export const saveWorkoutLog = (log: Omit<WorkoutLog, 'id' | 'userId'>): WorkoutLog | null => {
  const currentUser = getCurrentUsername();
  if (!currentUser) return null;

  const logs = getWorkoutLogs(); // Gets current user logs, but we need ALL to save back to LS
  
  // Need to get RAW logs to append
  let allLogs: WorkoutLog[] = [];
  try {
      const data = localStorage.getItem(LOGS_KEY);
      allLogs = data ? JSON.parse(data) : [];
  } catch(e) {}

  const newLog: WorkoutLog = {
    ...log,
    id: Date.now().toString(),
    userId: currentUser
  };

  const updatedLogs = [newLog, ...allLogs];
  localStorage.setItem(LOGS_KEY, JSON.stringify(updatedLogs));
  
  // Update user points
  const pointsEarned = 10 + log.repCount + (log.formScore * 5);
  updateUserPoints(pointsEarned);

  return newLog;
};

export const saveWorkoutPlan = (plan: string): void => {
  // Prefixing plan with user key would be better, but keeping simple for now
  // Using a composite key for storage would be better: `fitsense_plan_${username}`
  const username = getCurrentUsername();
  if (username) {
      localStorage.setItem(`${PLAN_KEY}_${username}`, plan);
  }
};

export const getWorkoutPlan = (): string | null => {
  const username = getCurrentUsername();
  if (username) {
      return localStorage.getItem(`${PLAN_KEY}_${username}`);
  }
  return null;
};

export const clearHistory = (): void => {
  // Only clears current user logs
  const username = getCurrentUsername();
  if (!username) return;

  let allLogs: WorkoutLog[] = [];
  try {
      const data = localStorage.getItem(LOGS_KEY);
      allLogs = data ? JSON.parse(data) : [];
  } catch(e) {}

  const keptLogs = allLogs.filter(log => log.userId !== username);
  localStorage.setItem(LOGS_KEY, JSON.stringify(keptLogs));
};

// --- Gamification Logic ---

export const calculateStreak = (): number => {
  const logs = getWorkoutLogs(); // Already filtered by user
  if (logs.length === 0) return 0;

  // Extract unique dates (ignoring time)
  const uniqueDates = Array.from(new Set(logs.map(log => 
    new Date(log.date).toDateString()
  ))).map(dateStr => new Date(dateStr));

  // Sort descending
  uniqueDates.sort((a, b) => b.getTime() - a.getTime());

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if latest workout is today or yesterday to start streak
  const lastWorkout = uniqueDates[0];
  if (lastWorkout.getTime() !== today.getTime() && lastWorkout.getTime() !== yesterday.getTime()) {
    return 0;
  }

  let streak = 1;
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = uniqueDates[i];
    const next = uniqueDates[i + 1];
    
    const diffTime = Math.abs(current.getTime() - next.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

export const getBadges = (): Badge[] => {
  const logs = getWorkoutLogs(); // User filtered
  const totalReps = logs.reduce((acc, l) => acc + l.repCount, 0);
  const totalWorkouts = logs.length;
  const perfectForms = logs.filter(l => l.formScore >= 9).length;

  // Define badges
  const definitions = [
    { id: 'first_step', name: 'First Step', desc: 'Complete your first workout', icon: 'Footprints', condition: () => totalWorkouts >= 1 },
    { id: 'getting_strong', name: 'Getting Strong', desc: 'Complete 5 workouts', icon: 'Dumbbell', condition: () => totalWorkouts >= 5 },
    { id: 'dedicated', name: 'Dedicated', desc: 'Complete 20 workouts', icon: 'Trophy', condition: () => totalWorkouts >= 20 },
    { id: 'rep_master', name: 'Rep Master', desc: 'Accumulate 100 total reps', icon: 'Layers', condition: () => totalReps >= 100 },
    { id: 'form_perfect', name: 'Form Perfectionist', desc: 'Get a form score of 9+ in 3 workouts', icon: 'Star', condition: () => perfectForms >= 3 },
    { id: 'streak_week', name: 'On Fire', desc: 'Maintain a 3-day streak', icon: 'Flame', condition: () => calculateStreak() >= 3 },
  ];

  return definitions.map(def => ({
    id: def.id,
    name: def.name,
    description: def.desc,
    icon: def.icon,
    unlocked: def.condition()
  }));
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  const users = getAllUsers();
  const currentUser = getCurrentUsername();
  
  // Real users
  const entries: LeaderboardEntry[] = Object.values(users).map(user => ({
      rank: 0,
      username: user.username,
      points: user.totalPoints,
      isCurrentUser: user.username === currentUser
  }));

  // Mock users
  const existingUsernames = new Set(entries.map(e => e.username));
  const mockUsers = [
      { username: 'Sarah Fit', points: 1250 },
      { username: 'GymRat_99', points: 980 },
      { username: 'MikeLifts', points: 1500 },
      { username: 'BeginnerBob', points: 150 }
  ];

  // Add mock users if list is small to make it interesting
  if (entries.length < 5) {
      mockUsers.forEach(mock => {
          // Only add mock user if that username doesn't already exist in real users
          if (!existingUsernames.has(mock.username)) {
              entries.push({
                  rank: 0,
                  username: mock.username,
                  points: mock.points,
                  isCurrentUser: false
              });
          }
      });
  }

  // Sort by points desc
  entries.sort((a, b) => b.points - a.points);

  // Assign ranks
  return entries.map((e, index) => ({ ...e, rank: index + 1 }));
};
