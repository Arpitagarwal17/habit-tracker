import { AppState } from '../types/habit';

const STORAGE_KEY = 'habit-tracker-data';
const DEBOUNCE_MS = 300;

let saveTimeout: ReturnType<typeof setTimeout> | null = null;

export function loadState(): AppState {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as AppState;
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }
  return { habits: [], completions: [] };
}

export function saveState(state: AppState): void {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }, DEBOUNCE_MS);
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}
