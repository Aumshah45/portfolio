import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../data/siteConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const option =
  'flex w-full cursor-pointer items-center justify-center gap-2 rounded-panel px-4 py-3 text-[14px] font-semibold transition-colors';

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
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[rgba(4,10,7,0.6)] px-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[420px] max-w-full overflow-hidden rounded-panel border border-line bg-bg-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between border-b border-line-2 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-acc">SC 06 · Post-credits</span>
              <span className="text-acc-dim">reply within a day</span>
            </div>
            <div className="p-6">
              <h3 id="contact-title" className="m-0 mb-1 text-[22px] font-bold tracking-[-0.02em] text-title stretch-106">
                Get in touch
              </h3>
              <p className="m-0 mb-5 text-[13.5px] text-text-2">Pick whichever is quickest for you.</p>

              <div className="mb-5 flex items-center justify-between gap-2 rounded-panel border border-line-2 bg-bg-3 px-4 py-3">
                <span className="truncate font-mono text-[13px] text-text">{siteConfig.email}</span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="shrink-0 cursor-pointer rounded-panel border border-line bg-transparent px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-acc transition-colors hover:bg-tint"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                <button type="button" onClick={openGmail} className={`${option} border-0 bg-acc text-acc-contrast hover:bg-acc-hover`}>
                  Open in Gmail
                </button>
                <button type="button" onClick={openMailClient} className={`${option} border border-line bg-transparent text-acc hover:bg-tint`}>
                  Open default email app
                </button>
              </div>
            </div>

            <div className="border-t border-line-2 px-6 py-3 text-center">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer border-0 bg-transparent font-mono text-[10.5px] uppercase tracking-[0.18em] text-acc-dim transition-colors hover:text-acc"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
