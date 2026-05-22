interface HeaderProps {
  onAddClick: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Habit Tracker</h1>
        <p>Build better habits, one day at a time</p>
      </div>
      <button className="add-btn" onClick={onAddClick} aria-label="Add new habit">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </header>
  );
}
