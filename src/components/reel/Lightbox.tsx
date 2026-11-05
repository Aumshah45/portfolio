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

/** Full-size, untreated view of a recognition screenshot. */
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
          className="overlay overlay--center lightbox"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
        >
          <img src={image.src} alt={image.alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" onClick={onClose} autoFocus className="btn lightbox__close">
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
