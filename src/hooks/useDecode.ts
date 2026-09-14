import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const GLYPHS = '0123456789+%#/';
const STEPS = 20;
const STEP_MS = 55;

/** Scrambles `value` and resolves it left to right, once, when it scrolls into view. */
export function useDecode<T extends Element>(value: string) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      if (step >= STEPS) {
        setText(value);
        window.clearInterval(timer);
        return;
      }
      setText(
        value
          .split('')
          .map((char, i) =>
            char === ' ' || step / STEPS > i / value.length + 0.3
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(''),
      );
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [inView, reduceMotion, value]);

  return { ref, text };
}
