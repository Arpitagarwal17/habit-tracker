import { useState, useEffect, useCallback } from 'react';
import { Habit, HabitCompletion, AppState } from '../types/habit';
import { loadState, saveState } from '../utils/storage';
import { getTodayString } from '../utils/dateUtils';

interface UseHabitsReturn {
  habits: Habit[];
  completions: HabitCompletion[];
  addHabit: (name: string, description: string, color: string) => void;
  updateHabit: (id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt'>>) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (habitId: string, date: string) => void;
  isCompleted: (habitId: string, date: string) => boolean;
  getCompletionsForHabit: (habitId: string) => HabitCompletion[];
}

export function useHabits(): UseHabitsReturn {
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addHabit = useCallback((name: string, description: string, color: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      color,
      createdAt: getTodayString(),
    };
    setState(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit],
    }));
  }, []);

  const updateHabit = useCallback((
    id: string,
    updates: Partial<Omit<Habit, 'id' | 'createdAt'>>
  ) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.map(h =>
        h.id === id ? { ...h, ...updates } : h
      ),
    }));
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setState(prev => ({
      habits: prev.habits.filter(h => h.id !== id),
      completions: prev.completions.filter(c => c.habitId !== id),
    }));
  }, []);

  const toggleCompletion = useCallback((habitId: string, date: string) => {
    setState(prev => {
      const exists = prev.completions.some(
        c => c.habitId === habitId && c.date === date
      );
      return {
        ...prev,
        completions: exists
          ? prev.completions.filter(
              c => !(c.habitId === habitId && c.date === date)
            )
          : [...prev.completions, { habitId, date }],
      };
    });
  }, []);

  const isCompleted = useCallback((habitId: string, date: string) => {
    return state.completions.some(
      c => c.habitId === habitId && c.date === date
    );
  }, [state.completions]);

  const getCompletionsForHabit = useCallback((habitId: string) => {
    return state.completions.filter(c => c.habitId === habitId);
  }, [state.completions]);

  return {
    habits: state.habits,
    completions: state.completions,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted,
    getCompletionsForHabit,
  };
}
