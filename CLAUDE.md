# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A habit tracking web app with dark theme, streak tracking, emoji support, and localStorage persistence. Built with React 18, TypeScript, and Vite.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build to dist/
npm run preview # Preview production build
```

## Architecture

### Data Flow
```
localStorage <-> storage.ts (loadState/saveState with 300ms debounce)
                    ↓
              AppState { habits[], completions[] }
                    ↓
         useHabits hook (CRUD operations)
                    ↓
         useTodayProgress hook (computed stats)
                    ↓
         Components (Header, StatsBar, HabitList, etc.)
```

### State Management
- `useHabits` - Single source of truth for all habit CRUD operations and completions
- `useTodayProgress` - Derived state computed from habits + completions (streaks, completion rate)
- localStorage persistence with debounced saves (300ms) to prevent excessive writes

### Key Types (src/types/habit.ts)
- `Habit` - Core entity: id, name, description, color, emoji, createdAt
- `HabitCompletion` - Record of completion: habitId + date (YYYY-MM-DD string)
- `HabitWithStats` - Habit merged with computed stats: streak, completedToday, totalCompletions

### Streak Algorithm (src/utils/streakCalculator.ts)
- Streaks count consecutive days back from today OR yesterday
- If most recent completion is neither today nor yesterday, streak = 0
- Dates stored as YYYY-MM-DD strings for timezone-safe lexicographic sorting

## Styling

- CSS custom properties defined in `:root` (src/index.css)
- Dark theme with purple/pink gradient accents
- Components use BEM-like class naming
- Responsive breakpoints at 480px for mobile

## Adding New Features

When adding components:
1. Add TypeScript interfaces to `src/types/habit.ts` if needed
2. Use `useHabits()` hook for all habit operations
3. CSS goes in `src/index.css` following existing patterns
