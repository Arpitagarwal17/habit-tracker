import { useState } from 'react';
import { HabitCompletion } from '../types/habit';
import { getDaysInMonth, getMonthName, formatDate, getTodayString } from '../utils/dateUtils';

interface HabitCalendarProps {
  habitId: string;
  habitName: string;
  completions: HabitCompletion[];
  onClose: () => void;
  onToggle: (habitId: string, date: string) => void;
}

export function HabitCalendar({ habitId, habitName, completions, onClose, onToggle }: HabitCalendarProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const days = getDaysInMonth(viewDate.year, viewDate.month);
  const completedDates = new Set(
    completions.filter(c => c.habitId === habitId).map(c => c.date)
  );

  const prevMonth = () => {
    setViewDate(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const nextMonth = () => {
    setViewDate(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  const firstDayOfMonth = new Date(viewDate.year, viewDate.month, 1).getDay();
  const todayString = getTodayString();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="calendar-modal" onClick={e => e.stopPropagation()}>
        <div className="calendar-header">
          <div className="calendar-title">
            <span>📅</span>
            <h3>{habitName}</h3>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="calendar-nav">
          <button onClick={prevMonth}>‹</button>
          <span className="calendar-month">{getMonthName(viewDate.month)} {viewDate.year}</span>
          <button onClick={nextMonth}>›</button>
        </div>

        <div className="calendar-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="calendar-day-header">{day}</div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty" />
          ))}

          {days.map(date => {
            const dateString = formatDate(date);
            const isCompleted = completedDates.has(dateString);
            const isToday = dateString === todayString;
            const isFuture = date > today;

            return (
              <button
                key={dateString}
                className={`calendar-day ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''} ${isFuture ? 'future' : ''}`}
                onClick={() => !isFuture && onToggle(habitId, dateString)}
                disabled={isFuture}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        <div className="calendar-stats">
          {completedDates.size} of {days.length} days in {getMonthName(viewDate.month)}
        </div>
      </div>
    </div>
  );
}
