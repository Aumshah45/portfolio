import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export interface LightboxImage {
  src: string;
  alt: string;
}

interface Props {
  image: LightboxImage | null;
  onClose: () => void;
}

/** Full-size, ungraded view of a recognition screenshot. */
export function Lightbox({ image, onClose }: Props) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [image, onClose]);

  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex cursor-zoom-out items-center justify-center bg-[rgba(4,10,7,0.9)] p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
        >
          <motion.img
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            src={image.src}
            alt={image.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[min(720px,95vw)] cursor-default rounded-panel border border-[#16241c] shadow-2xl"
          />
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close preview"
            className="absolute right-4 top-4 cursor-pointer rounded-panel border border-[rgba(46,231,135,0.3)] bg-[#04120b] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#2ee787] sm:right-6 sm:top-6"
          >
            Close · Esc
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
