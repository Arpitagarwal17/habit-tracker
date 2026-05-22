import { HabitWithStats } from '../types/habit';
import { HabitCard } from './HabitCard';

interface HabitListProps {
  habits: HabitWithStats[];
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  onViewCalendar: (habitId: string) => void;
}

export function HabitList({
  habits,
  onToggle,
  onDelete,
  onViewCalendar,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
        <h3>No habits yet</h3>
        <p>Click the + button to add your first habit</p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
          onViewCalendar={onViewCalendar}
        />
      ))}
    </div>
  );
}
