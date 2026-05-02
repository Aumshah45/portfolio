import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { commands } from '../../data/commands';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggle: toggleTheme } = useTheme();

  const filtered = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  function execute(action: string, target: string) {
    onClose();
    switch (action) {
      case 'scroll': {
        const el = document.getElementById(target);
        el?.scrollIntoView({ behavior: 'smooth' });
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[520px] max-w-[90vw] bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-3">
              <span className="text-[var(--color-text-muted)] text-lg">&#128269;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                placeholder="Type a command or search..."
                className="flex-1 border-none outline-none bg-transparent text-[15px] text-[var(--color-text-primary)] font-[inherit] placeholder:text-[var(--color-text-muted)]"
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filtered.map((cmd, i) => (
                <div
                  key={cmd.id}
                  onClick={() => execute(cmd.action, cmd.target)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer transition-colors ${
                    i === selectedIndex ? 'bg-[var(--color-bg-alt)]' : 'hover:bg-[var(--color-bg-alt)]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-soft)] flex items-center justify-center text-sm">
                    {cmd.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold">{cmd.title}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">{cmd.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-[var(--color-border)] flex gap-4 text-[11px] text-[var(--color-text-muted)]">
              <span><kbd className="font-mono bg-[var(--color-bg-alt)] px-1 rounded border border-[var(--color-border)] text-[10px]">&uarr;</kbd><kbd className="font-mono bg-[var(--color-bg-alt)] px-1 rounded border border-[var(--color-border)] text-[10px]">&darr;</kbd> Navigate</span>
              <span><kbd className="font-mono bg-[var(--color-bg-alt)] px-1 rounded border border-[var(--color-border)] text-[10px]">&crarr;</kbd> Select</span>
              <span><kbd className="font-mono bg-[var(--color-bg-alt)] px-1 rounded border border-[var(--color-border)] text-[10px]">Esc</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
