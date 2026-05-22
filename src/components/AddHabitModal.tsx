import { useState, useEffect, useRef } from 'react';
import { HABIT_COLORS } from '../constants/colors';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string, color: string) => void;
}

export function AddHabitModal({ isOpen, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(HABIT_COLORS[5]);
  const [error, setError] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      nameInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a habit name');
      return;
    }
    onAdd(name.trim(), description.trim(), color);
    setName('');
    setDescription('');
    setColor(HABIT_COLORS[5]);
    setError('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Add New Habit</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="habit-name">Name *</label>
            <input
              ref={nameInputRef}
              id="habit-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Morning exercise"
              maxLength={50}
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="habit-description">Description (optional)</label>
            <textarea
              id="habit-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g., 30 minutes of cardio"
              rows={2}
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {HABIT_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`color-swatch ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
