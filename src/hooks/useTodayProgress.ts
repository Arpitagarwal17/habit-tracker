import { useMemo } from 'react';
import { Habit, HabitCompletion, HabitWithStats } from '../types/habit';
import { getTodayString } from '../utils/dateUtils';
import { calculateStreak } from '../utils/streakCalculator';

interface UseTodayProgressReturn {
  totalHabits: number;
  completedToday: number;
  completionRate: number;
  bestStreak: number;
  habitsWithStats: HabitWithStats[];
}

export function useTodayProgress(
  habits: Habit[],
  completions: HabitCompletion[]
): UseTodayProgressReturn {
  return useMemo(() => {
    const today = getTodayString();

    const habitsWithStats: HabitWithStats[] = habits.map(habit => {
      const habitCompletions = completions
        .filter(c => c.habitId === habit.id)
        .map(c => c.date)
        .sort((a, b) => b.localeCompare(a));

      const completedToday = habitCompletions.includes(today);
      const streak = calculateStreak(habitCompletions);

      return {
        ...habit,
        streak,
        completedToday,
        totalCompletions: habitCompletions.length,
      };
    });

    const completedTodayCount = habitsWithStats.filter(h => h.completedToday).length;
    const completionRate = habits.length > 0
      ? Math.round((completedTodayCount / habits.length) * 100)
      : 0;
    const bestStreak = habitsWithStats.length > 0
      ? Math.max(...habitsWithStats.map(h => h.streak), 0)
      : 0;

    return {
      totalHabits: habits.length,
      completedToday: completedTodayCount,
      completionRate,
      bestStreak,
      habitsWithStats,
    };
  }, [habits, completions]);
}
