import { useState } from 'react';
import { useHabits } from './hooks/useHabits';
import { useTodayProgress } from './hooks/useTodayProgress';
import { getTodayString } from './utils/dateUtils';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { HabitList } from './components/HabitList';
import { AddHabitModal } from './components/AddHabitModal';
import { HabitCalendar } from './components/HabitCalendar';

export function App() {
  const {
    habits,
    completions,
    addHabit,
    deleteHabit,
    toggleCompletion,
  } = useHabits();

  const {
    totalHabits,
    completedToday,
    bestStreak,
    habitsWithStats,
  } = useTodayProgress(habits, completions);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarHabitId, setCalendarHabitId] = useState<string | null>(null);

  const handleAddHabit = (name: string, description: string, color: string) => {
    addHabit(name, description, color);
  };

  const handleToggle = (habitId: string) => {
    toggleCompletion(habitId, getTodayString());
  };

  const handleDelete = (habitId: string) => {
    deleteHabit(habitId);
  };

  const handleViewCalendar = (habitId: string) => {
    setCalendarHabitId(habitId);
  };

  const handleCalendarToggle = (habitId: string, date: string) => {
    toggleCompletion(habitId, date);
  };

  const calendarHabit = calendarHabitId
    ? habitsWithStats.find(h => h.id === calendarHabitId)
    : null;

  return (
    <div className="app">
      <Header onAddClick={() => setIsModalOpen(true)} />

      <main className="main-content">
        <StatsBar
          totalHabits={totalHabits}
          completedToday={completedToday}
          bestStreak={bestStreak}
        />

        <HabitList
          habits={habitsWithStats}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onViewCalendar={handleViewCalendar}
        />
      </main>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHabit}
      />

      {calendarHabit && (
        <HabitCalendar
          habitId={calendarHabit.id}
          habitName={calendarHabit.name}
          completions={completions}
          onClose={() => setCalendarHabitId(null)}
          onToggle={handleCalendarToggle}
        />
      )}
    </div>
  );
}
