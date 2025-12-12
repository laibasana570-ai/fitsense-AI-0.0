
export interface AnalysisResult {
  exerciseName: string;
  repCount: number;
  formScore: number;
  feedback: string[];
  suggestions: string[];
}

export interface WorkoutLog {
  id: string;
  userId: string; // Added to associate logs with specific users
  date: string;
  exerciseName: string;
  repCount: number;
  formScore: number;
  feedback: string[];
}

export enum UserGoal {
  LOSE_WEIGHT = "Lose Weight",
  BUILD_MUSCLE = "Build Muscle",
  IMPROVE_ENDURANCE = "Improve Endurance",
  FLEXIBILITY = "Flexibility & Mobility"
}

export enum FitnessLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced"
}

export interface WorkoutPlanRequest {
  goal: UserGoal;
  level: FitnessLevel;
  daysPerWeek: number;
  equipment: string;
  durationMinutes: number;
  age?: number;
  focusArea?: string;
  limitations?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name mapping
  unlocked: boolean;
  dateUnlocked?: string;
}

export interface UserProfile {
  username: string;
  password?: string; // Added for basic auth
  email?: string;
  joinedDate: string;
  totalPoints: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  isCurrentUser: boolean;
}
