import { formatDate, addDays, parseDate, getTodayString } from './dateUtils';

export function calculateStreak(completions: string[]): number {
  if (completions.length === 0) return 0;

  const sortedDates = [...completions].sort((a, b) => b.localeCompare(a));
  const today = getTodayString();
  const yesterday = formatDate(addDays(new Date(), -1));

  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  let streak = 0;
  let currentDate = sortedDates[0] === today ? today : yesterday;

  for (const date of sortedDates) {
    if (date === currentDate) {
      streak++;
      currentDate = formatDate(addDays(parseDate(currentDate), -1));
    } else if (date < currentDate) {
      break;
    }
  }

  return streak;
}

export function calculateLongestStreak(completions: string[]): number {
  if (completions.length === 0) return 0;

  const sortedDates = [...completions].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = parseDate(sortedDates[i - 1]);
    const curr = parseDate(sortedDates[i]);
    const diffDays = Math.round(
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diffDays > 1) {
      current = 1;
    }
  }

  return longest;
}
