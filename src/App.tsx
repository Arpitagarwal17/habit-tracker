import { useState, useEffect, useRef } from 'react';
import { useHabits } from './hooks/useHabits';
import { useTodayProgress } from './hooks/useTodayProgress';
import { getTodayString } from './utils/dateUtils';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { HabitList } from './components/HabitList';
import { AddHabitModal } from './components/AddHabitModal';
import { HabitCalendar } from './components/HabitCalendar';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
}

function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const colors = ['#8b5cf6', '#ec4899', '#22c55e', '#f97316', '#eab308', '#6366f1'];

  useEffect(() => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
      });
    }
    setPieces(newPieces);
  }, []);

  return (
    <div className="confetti-container">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function App() {
  const { habits, completions, addHabit, deleteHabit, toggleCompletion } = useHabits();
  const { totalHabits, completedToday, bestStreak, habitsWithStats } = useTodayProgress(habits, completions);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarHabitId, setCalendarHabitId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevCompletedRef = useRef(0);

  const handleAddHabit = (name: string, description: string, color: string, emoji: string) => {
    addHabit(name, description, color, emoji);
  };

  const handleToggle = (habitId: string) => {
    const wasCompleted = habitsWithStats.find(h => h.id === habitId)?.completedToday;
    toggleCompletion(habitId, getTodayString());

    if (!wasCompleted && totalHabits > 0 && completedToday + 1 === totalHabits) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    prevCompletedRef.current = completedToday;
  };

  const handleViewCalendar = (habitId: string) => {
    setCalendarHabitId(habitId);
  };

  const handleCalendarToggle = (habitId: string, date: string) => {
    toggleCompletion(habitId, date);
  };

  const calendarHabit = calendarHabitId ? habitsWithStats.find(h => h.id === calendarHabitId) : null;

  return (
    <div className="app">
      {showConfetti && <Confetti />}

      <Header onAddClick={() => setIsModalOpen(true)} />

      <StatsBar
        totalHabits={totalHabits}
        completedToday={completedToday}
        bestStreak={bestStreak}
      />

      <HabitList
        habits={habitsWithStats}
        onToggle={handleToggle}
        onDelete={deleteHabit}
        onViewCalendar={handleViewCalendar}
      />

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
