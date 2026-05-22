# Habit Tracker

A beautiful, minimalist habit tracking app built with React, TypeScript, and Vite. Track your daily habits, build streaks, and watch your progress grow.

![Habit Tracker Preview](https://raw.githubusercontent.com/Arpitagarwal17/habit-tracker/main/screenshot.png)

## Features

- **Track Daily Habits** - Add habits with custom names, descriptions, and colors
- **Emoji Support** - Choose from 32 curated emojis to represent each habit
- **Streak Tracking** - Build consecutive day streaks and watch your best streak grow
- **Progress Dashboard** - Visual progress ring showing your daily completion rate
- **Calendar View** - Review your completion history for any habit
- **Confetti Celebration** - Celebrate when you complete all your daily habits
- **Persistent Storage** - Your data is saved locally and persists across sessions
- **Responsive Design** - Works beautifully on desktop and mobile

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **localStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Arpitagarwal17/habit-tracker.git

# Navigate to project directory
cd habit-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Usage

1. **Add a Habit** - Click the purple + button in the top right
2. **Choose an Emoji** - Pick from the emoji dropdown
3. **Pick a Color** - Select a color for your habit card
4. **Mark Complete** - Click the checkbox to mark today's habit as done
5. **View History** - Click on a habit card to see your completion calendar
6. **Build Streaks** - Complete habits consistently to build longer streaks

## Project Structure

```
habit-tracker/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── StatsBar.tsx
│   │   ├── HabitCard.tsx
│   │   ├── HabitList.tsx
│   │   ├── AddHabitModal.tsx
│   │   ├── HabitCalendar.tsx
│   │   └── EmojiPicker.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useHabits.ts
│   │   └── useTodayProgress.ts
│   ├── utils/           # Utility functions
│   │   ├── dateUtils.ts
│   │   ├── storage.ts
│   │   └── streakCalculator.ts
│   ├── types/           # TypeScript types
│   │   └── habit.ts
│   ├── constants/        # App constants
│   │   └── colors.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with by Arpit Agarwal
