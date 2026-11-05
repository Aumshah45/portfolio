import { useEffect } from 'react';

/**
 * Marks every `[data-reveal]` element `.is-in` the first time it scrolls into
 * view, including ones a lazy route mounts later. The hidden starting state
 * lives in CSS under `.js`, so with scripting off everything simply shows.
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    const watch = (root: ParentNode) => root.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    watch(document);

    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && (n.matches('[data-reveal]') ? io.observe(n) : watch(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
