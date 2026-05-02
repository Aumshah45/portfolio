import { useEffect, useState } from 'react';

/**
 * Tiny "scroll" hint at the bottom of the Hero. Fades out once the user starts scrolling.
 */
export function ScrollNudge() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => {
      setVisible(window.scrollY < 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="inline-block w-6 h-px bg-[var(--color-text-muted)]" />
      <span>scroll</span>
      <span className="inline-block animate-bounce" style={{ animationDuration: '2s' }}>↓</span>
    </div>
  );
}
