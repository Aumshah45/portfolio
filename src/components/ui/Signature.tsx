interface SignatureProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  /** When true, the path animates in (hand-draw effect) on first reveal */
  animate?: boolean;
  ariaLabel?: string;
}

/**
 * Stylized hand-drawn "Aum" signature in SVG. Single continuous path.
 * Used in About section close, CTA close, and Footer.
 */
export function Signature({
  color = 'currentColor',
  width = 140,
  height = 56,
  className = '',
  animate = true,
  ariaLabel = "Aum's signature",
}: SignatureProps) {
  return (
    <svg
      viewBox="0 0 280 110"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      {/* Continuous, calligraphic "Aum" — designed to feel hand-written */}
      <path
        // A: rising left stroke, peak, descending right stroke, crossbar
        // u: dip down + rise + curve into m
        // m: two humps, terminal swoop with a long underline flourish
        d="M 14 86 C 30 50, 46 22, 64 18 C 78 16, 80 30, 84 46 C 88 62, 92 78, 100 86 M 38 64 L 88 64 M 110 50 C 110 78, 130 92, 146 76 C 156 66, 156 52, 152 42 M 152 42 C 152 60, 158 84, 168 86 C 178 88, 188 76, 196 60 C 200 52, 202 56, 204 70 C 206 86, 218 90, 230 78 C 242 66, 252 52, 258 38 M 24 100 C 90 102, 200 100, 268 92"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          animate
            ? {
                strokeDasharray: 800,
                strokeDashoffset: 800,
                animation: 'sig-draw 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.3s forwards',
              }
            : undefined
        }
      />
    </svg>
  );
}
