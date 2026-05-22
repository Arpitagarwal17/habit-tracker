import { HabitWithStats } from '../types/habit';

interface HabitCardProps {
  habit: HabitWithStats;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  onViewCalendar?: (habitId: string) => void;
}

export function HabitCard({ habit, onToggle, onDelete, onViewCalendar }: HabitCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.delete-btn') || target.closest('.checkbox-wrapper')) return;
    onViewCalendar?.(habit.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${habit.name}"? This cannot be undone.`)) {
      onDelete(habit.id);
    }
  };

  return (
    <div
      className={`habit-card ${habit.completedToday ? 'completed' : ''}`}
      style={{ '--habit-color': habit.color } as React.CSSProperties}
      onClick={handleClick}
    >
      <div className="emoji-wrapper">
        {habit.emoji}
      </div>

      <div className="habit-info">
        <div className="habit-name">{habit.name}</div>
        {habit.description && (
          <div className="habit-desc">{habit.description}</div>
        )}
      </div>

      <div className="habit-meta">
        <div className="streak-badge" onClick={() => onViewCalendar?.(habit.id)}>
          <span className="fire">🔥</span>
          <span>{habit.streak}</span>
        </div>

        <button
          className="delete-btn"
          onClick={handleDelete}
          aria-label="Delete habit"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>

        <div
          className={`checkbox-wrapper ${habit.completedToday ? 'checked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(habit.id);
          }}
          role="checkbox"
          aria-checked={habit.completedToday}
          aria-label={`Mark ${habit.name} as ${habit.completedToday ? 'incomplete' : 'complete'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>
  );
}
