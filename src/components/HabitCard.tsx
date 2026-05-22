import { useState } from 'react';
import { HabitWithStats } from '../types/habit';

interface HabitCardProps {
  habit: HabitWithStats;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  onViewCalendar?: (habitId: string) => void;
}

export function HabitCard({
  habit,
  onToggle,
  onDelete,
  onViewCalendar,
}: HabitCardProps) {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Delete "${habit.name}"? This cannot be undone.`)) {
      onDelete(habit.id);
    }
    setShowDelete(false);
  };

  return (
    <div className={`habit-card ${habit.completedToday ? 'completed' : ''}`}>
      <div className="habit-info">
        <span
          className="habit-color"
          style={{ backgroundColor: habit.color }}
        />
        <div className="habit-details">
          <h3 className="habit-name">{habit.name}</h3>
          {habit.description && (
            <p className="habit-description">{habit.description}</p>
          )}
        </div>
      </div>

      <div className="habit-actions">
        <button
          className="streak-badge"
          onClick={() => onViewCalendar?.(habit.id)}
          title="View completion history"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#f97316"
            stroke="none"
          >
            <path d="M12 23c-1.5 0-3-1-3-3 0-2 1.5-3.5 3-5 1.5 1.5 3 3 3 5 0 2-1.5 3-3 3z" />
            <path d="M12 18c-.5 0-1-.3-1-1 0-1 .5-1.5 1-2.5.5 1 1 1.5 1 2.5 0 .7-.5 1-1 1z" />
          </svg>
          <span>{habit.streak}</span>
        </button>

        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={habit.completedToday}
            onChange={() => onToggle(habit.id)}
            aria-label={`Mark ${habit.name} as ${habit.completedToday ? 'incomplete' : 'complete'}`}
          />
          <span className="checkmark">
            {habit.completedToday && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </span>
        </label>

        <div className="delete-container">
          <button
            className="delete-button"
            onClick={() => setShowDelete(!showDelete)}
            aria-label="More options"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="6" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="18" r="2" />
            </svg>
          </button>
          {showDelete && (
            <button className="delete-confirm" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
