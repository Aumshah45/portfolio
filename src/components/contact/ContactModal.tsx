import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../data/siteConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openGmail() {
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${siteConfig.email}&su=Project%20Inquiry`,
      '_blank'
    );
    onClose();
  }

  function openMailClient() {
    window.location.href = `mailto:${siteConfig.email}?subject=Project%20Inquiry`;
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
          className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[400px] max-w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-soft)] flex items-center justify-center text-2xl mx-auto mb-4">
                &#9993;
              </div>
              <h3 className="text-lg font-bold mb-1">Get in Touch</h3>
              <p className="text-[13px] text-[var(--color-text-secondary)] mb-5">
                Choose how you'd like to reach out
              </p>

              <div className="bg-[var(--color-bg-alt)] rounded-xl px-4 py-3 mb-5 flex items-center justify-between gap-2">
                <span className="text-[14px] font-mono text-[var(--color-text-secondary)] truncate">
                  {siteConfig.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="shrink-0 text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors cursor-pointer"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={openGmail}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[14px] font-semibold bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors cursor-pointer"
                >
                  Open in Gmail
                </button>
                <button
                  onClick={openMailClient}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[14px] font-medium border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-alt)] transition-colors cursor-pointer"
                >
                  Open Default Email App
                </button>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[var(--color-border)] text-center">
              <button
                onClick={onClose}
                className="text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer"
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
