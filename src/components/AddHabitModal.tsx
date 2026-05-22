import { useState, useEffect, useRef } from 'react';
import { HABIT_COLORS, DEFAULT_COLOR, DEFAULT_EMOJI } from '../constants/colors';
import { EmojiPicker } from './EmojiPicker';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string, color: string, emoji: string) => void;
}

export function AddHabitModal({ isOpen, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI);
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
    onAdd(name.trim(), description.trim(), color, emoji);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setColor(DEFAULT_COLOR);
    setEmoji(DEFAULT_EMOJI);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">
          <span>✨</span>
          <span>Create New Habit</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Habit Name *</label>
            <input
              ref={nameInputRef}
              type="text"
              className="form-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Morning meditation"
              maxLength={50}
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Description (optional)</label>
            <textarea
              className="form-input form-textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g., 10 minutes of mindfulness"
              rows={2}
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Choose an Emoji</label>
            <EmojiPicker selectedEmoji={emoji} onSelect={setEmoji} />
          </div>

          <div className="form-group">
            <label className="form-label">Pick a Color</label>
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
