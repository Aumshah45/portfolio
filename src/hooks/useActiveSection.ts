import { useEffect, useState } from 'react';

/**
 * Returns the id of the section crossing a thin band at the middle of the
 * viewport. A band (rather than intersection ratios) works for sections of any
 * height. Pass `watchKey` (e.g. the pathname) so the hook re-attaches when the
 * sections mount after a route transition.
 */
export function useActiveSection(sectionIds: readonly string[], watchKey?: string): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let intersection: IntersectionObserver | null = null;
    let mutation: MutationObserver | null = null;
    const visible = new Set<string>();

    const attach = (): boolean => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (elements.length === 0) return false;

      intersection = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          const current = sectionIds.find((id) => visible.has(id));
          if (current) setActive(current);
        },
        { rootMargin: '-45% 0px -54% 0px', threshold: 0 },
      );
      elements.forEach((el) => intersection!.observe(el));
      return true;
    };

    if (!attach()) {
      mutation = new MutationObserver(() => {
        if (attach()) {
          mutation?.disconnect();
          mutation = null;
        }
      });
      mutation.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      intersection?.disconnect();
      mutation?.disconnect();
    };
  }, [sectionIds, watchKey]);

  return active;
}
