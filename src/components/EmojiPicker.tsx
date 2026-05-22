import { useState } from 'react';
import { HABIT_EMOJIS } from '../constants/colors';

interface EmojiPickerProps {
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
}

export function EmojiPicker({ selectedEmoji, onSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="emoji-picker-container">
      <button
        type="button"
        className="emoji-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="emoji-display">{selectedEmoji}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="emoji-backdrop" onClick={() => setIsOpen(false)} />
          <div className="emoji-dropdown">
            <div className="emoji-grid">
              {HABIT_EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  className={`emoji-option ${selectedEmoji === emoji ? 'selected' : ''}`}
                  onClick={() => {
                    onSelect(emoji);
                    setIsOpen(false);
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
