import { useId, useRef } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  /** y values on a 0 (top) to 44 (bottom) scale, spread evenly across the width. */
  points?: number[];
  className?: string;
}

const WIDTH = 220;
const HEIGHT = 44;

export function Sparkline({ points = [38, 34, 35, 26, 28, 18, 19, 10, 5], className = 'h-11' }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const gradientId = `spark${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const step = WIDTH / (points.length - 1);
  const line = points.map((y, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${y}`).join(' ');
  const area = `${line} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full text-acc ${inView ? 'spark-go' : ''} ${className}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} opacity="0.45" />
      <path
        className="spark-line"
        d={line}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
