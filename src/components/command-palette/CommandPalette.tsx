import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { commands } from '../../data/commands';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="overlay overlay--top"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <PaletteBody onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Mounted fresh on every open, so the query and selection always start clean. */
function PaletteBody({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { toggle: toggleTheme } = useTheme();

  const filtered = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  function execute(action: string, target: string) {
    onClose();
    switch (action) {
      case 'scroll': {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.assign(`/#${target}`);
        break;
      }
      case 'theme':
        toggleTheme();
        break;
      case 'external':
        window.open(target, '_blank');
        break;
      case 'download': {
        const a = document.createElement('a');
        a.href = target;
        a.download = '';
        a.click();
        break;
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      execute(filtered[selectedIndex].action, filtered[selectedIndex].target);
    }
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="sheet"
      onKeyDown={handleKeyDown}
    >
      <input
        autoFocus
        value={query}
        onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
        placeholder="Jump to a section or run a command"
        aria-label="Search commands"
        className="palette__input"
      />
      <ul className="palette__list" role="listbox" aria-label="Commands">
        {filtered.length === 0 && <li className="palette__empty">Nothing matches “{query}”. Try a section name, like Work or Notes.</li>}
        {filtered.map((cmd, i) => (
          <li
            key={cmd.id}
            role="option"
            aria-selected={i === selectedIndex}
            onClick={() => execute(cmd.action, cmd.target)}
            onMouseEnter={() => setSelectedIndex(i)}
            className="palette__item"
          >
            <b>{cmd.title}</b>
            <span>{cmd.description}</span>
          </li>
        ))}
      </ul>
      <p className="palette__keys">
        <span>Arrow keys to move</span>
        <span>Enter to select</span>
        <span>Esc to close</span>
      </p>
    </motion.div>
  );
}
