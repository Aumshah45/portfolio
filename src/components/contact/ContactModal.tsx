import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../data/siteConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  function copyEmail() {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openGmail() {
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${siteConfig.email}&su=Getting%20in%20touch`,
      '_blank'
    );
    onClose();
  }

  function openMailClient() {
    window.location.href = `mailto:${siteConfig.email}?subject=Getting%20in%20touch`;
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="overlay overlay--center"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title-modal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="sheet"
          >
            <div className="sheet__head">
              <h2 id="contact-title-modal">
                Get in touch
              </h2>
            </div>
            <div className="sheet__body">
              <p>Pick whichever is quickest for you. I reply within a day.</p>
              <div className="copyrow">
                <span>{siteConfig.email}</span>
                <button type="button" onClick={copyEmail} className="btn btn--text btn--small" aria-live="polite">
                  {copied ? 'Copied' : 'Copy address'}
                </button>
              </div>
              <button type="button" onClick={openGmail} className="btn">
                Open in Gmail
              </button>
              <button type="button" onClick={openMailClient} className="btn btn--text">
                Open my email app
              </button>
            </div>
            <div className="sheet__foot">
              <button type="button" onClick={onClose} className="btn btn--text btn--small">
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
