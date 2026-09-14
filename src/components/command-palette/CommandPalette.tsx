import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { commands } from '../../data/commands';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const kbd = 'rounded border border-line-2 bg-bg-3 px-1 font-mono text-[10px]';

export function CommandPalette({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[1000] flex items-start justify-center bg-[rgba(4,10,7,0.6)] pt-[20vh] backdrop-blur-sm"
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
      initial={{ opacity: 0, scale: 0.97, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -10 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-[520px] max-w-[90vw] overflow-hidden rounded-panel border border-line bg-bg-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-3 border-b border-line-2 px-4 py-3.5">
        <span className="font-mono text-[12px] text-acc" aria-hidden="true">
          &gt;
        </span>
        <input
          autoFocus
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
          placeholder="Jump to a scene or run a command"
          aria-label="Search commands"
          className="flex-1 border-none bg-transparent font-mono text-[14px] text-title outline-none placeholder:text-acc-dim"
        />
      </div>
      <div className="max-h-[320px] overflow-y-auto p-2" role="listbox">
        {filtered.length === 0 && (
          <p className="m-0 px-3 py-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-acc-dim">
            No scene matches &ldquo;{query}&rdquo;
          </p>
        )}
        {filtered.map((cmd, i) => (
          <div
            key={cmd.id}
            role="option"
            aria-selected={i === selectedIndex}
            onClick={() => execute(cmd.action, cmd.target)}
            onMouseEnter={() => setSelectedIndex(i)}
            className={`flex cursor-pointer items-center gap-3 rounded-panel border px-3 py-2.5 transition-colors ${
              i === selectedIndex ? 'border-line bg-tint' : 'border-transparent'
            }`}
          >
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-panel border border-line-2 bg-bg-3 font-mono text-[11px] text-acc">
              {cmd.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-title">{cmd.title}</div>
              <div className="truncate text-[11.5px] text-text-2">{cmd.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 border-t border-line-2 px-4 py-2.5 font-mono text-[10.5px] text-acc-dim">
        <span><kbd className={kbd}>&uarr;</kbd><kbd className={kbd}>&darr;</kbd> navigate</span>
        <span><kbd className={kbd}>&crarr;</kbd> select</span>
        <span><kbd className={kbd}>Esc</kbd> close</span>
      </div>
    </motion.div>
  );
}
