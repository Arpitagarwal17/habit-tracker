import { HabitWithStats } from '../types/habit';
import { HabitCard } from './HabitCard';

interface HabitListProps {
  habits: HabitWithStats[];
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  onViewCalendar: (habitId: string) => void;
}

export function HabitList({ habits, onToggle, onDelete, onViewCalendar }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎯</div>
        <h3>Start Your Journey</h3>
        <p>Tap the + button to create your first habit and begin building a better routine.</p>
      </div>
    );
  }

  return (
    <div className="habit-list-section">
      <div className="section-header">
        <h2>Your Habits</h2>
        <span className="habit-count">{habits.length} habits</span>
      </div>
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
    </div>
  );
}
