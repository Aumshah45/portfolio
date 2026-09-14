import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';

const scenes = [
  { id: 'top', code: 'SC01', label: 'Open' },
  { id: 'work', code: 'SC02', label: 'Holdings' },
  { id: 'honest', code: 'SC03', label: 'Intermission' },
  { id: 'about', code: 'SC04', label: 'Player' },
  { id: 'recognition', code: 'SC05', label: 'Reel' },
  { id: 'contact', code: 'SC06', label: 'Credits' },
];

const sceneIds = scenes.map((s) => s.id);

/** Video-scrubber navigation: scroll progress on top, scene keyframes below. */
export function Playhead() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const active = useActiveSection(sceneIds, pathname);

  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Scenes"
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-[var(--ph-bg)] backdrop-blur-[10px]"
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
        className="absolute -top-px left-0 h-0.5 w-full origin-left bg-acc shadow-[var(--glow-dot)]"
      />
      <div className="mx-auto flex max-w-[1160px] justify-between gap-1.5 px-7 max-[700px]:px-2.5">
        {scenes.map((scene) => {
          const isActive = onHome && active === scene.id;
          return (
            <Link
              key={scene.id}
              to={`/#${scene.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={`flex-1 truncate border-t-2 px-0.5 pb-3.5 pt-[15px] text-center font-mono text-[9px] uppercase tracking-[0.14em] no-underline transition-colors max-[700px]:tracking-[0.08em] ${
                isActive ? 'border-acc text-acc' : 'border-transparent text-acc-dim hover:text-acc'
              }`}
            >
              {scene.code}
              <span className="max-[700px]:hidden"> {scene.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
