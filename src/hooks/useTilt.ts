import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Decorative tilt: the element leans toward the pointer, eased so it has weight.
 * Off on touch screens and under reduced motion. Writes transform on the inner
 * element only, so nothing else restyles.
 */
export function useTilt(slot: RefObject<HTMLElement | null>, inner: RefObject<HTMLElement | null>, strength = 10) {
  useEffect(() => {
    const el = inner.current;
    if (!el || !slot.current) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `rotateY(${x.toFixed(3)}deg) rotateX(${y.toFixed(3)}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = slot.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > innerHeight) return;
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / innerWidth)) * strength;
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / innerHeight)) * -strength * 0.7;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [slot, inner, strength]);
}
