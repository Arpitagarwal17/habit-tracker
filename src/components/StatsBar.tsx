interface StatsBarProps {
  totalHabits: number;
  completedToday: number;
  bestStreak: number;
}

export function StatsBar({ totalHabits, completedToday, bestStreak }: StatsBarProps) {
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const circumference = 2 * Math.PI * 26;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="stats-section">
      <div className="stats-header">
        <h2>Today's Progress</h2>
        <div className="week-nav">
          <button className="active">This Week</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">📋</div>
          <div className="stat-value">{totalHabits}</div>
          <div className="stat-label">Total Habits</div>
        </div>

        <div className="stat-card">
          <div className="progress-ring-container">
            <div className="progress-ring">
              <svg width="64" height="64" viewBox="0 0 64 64">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
                <circle className="progress-ring-bg" cx="32" cy="32" r="26" />
                <circle
                  className="progress-ring-fill"
                  cx="32"
                  cy="32"
                  r="26"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="progress-text">{completionRate}%</div>
            </div>
            <div>
              <div className="stat-value">{completedToday}/{totalHabits}</div>
              <div className="stat-label">Done Today</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">🔥</div>
          <div className="stat-value">{bestStreak}</div>
          <div className="stat-label">Best Streak</div>
        </div>
      </div>
    </div>
  );
}
