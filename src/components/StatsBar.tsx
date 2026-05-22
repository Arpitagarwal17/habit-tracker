interface StatsBarProps {
  totalHabits: number;
  completedToday: number;
  bestStreak: number;
}

export function StatsBar({ totalHabits, completedToday, bestStreak }: StatsBarProps) {
  const completionRate = totalHabits > 0
    ? Math.round((completedToday / totalHabits) * 100)
    : 0;

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <span className="stat-value">{totalHabits}</span>
        <span className="stat-label">Total Habits</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{completedToday}/{totalHabits}</span>
        <span className="stat-label">Done Today</span>
        <div className="stat-progress">
          <div
            className="stat-progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-value">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#f97316"
            stroke="none"
          >
            <path d="M12 23c-1.5 0-3-1-3-3 0-2 1.5-3.5 3-5 1.5 1.5 3 3 3 5 0 2-1.5 3-3 3z" />
            <path d="M12 18c-.5 0-1-.3-1-1 0-1 .5-1.5 1-2.5.5 1 1 1.5 1 2.5 0 .7-.5 1-1 1z" />
          </svg>
          {bestStreak}
        </span>
        <span className="stat-label">Best Streak</span>
      </div>
    </div>
  );
}
