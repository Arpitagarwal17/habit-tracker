export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
}

export interface AppState {
  habits: Habit[];
  completions: HabitCompletion[];
}

export interface HabitWithStats extends Habit {
  streak: number;
  completedToday: boolean;
  totalCompletions: number;
}

export interface DashboardStats {
  totalHabits: number;
  completedToday: number;
  completionRate: number;
  bestStreak: number;
}
