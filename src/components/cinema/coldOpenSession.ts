const SEEN_KEY = 'replay-seen';

/** Once per browser session, never under reduced motion. */
export function shouldPlayColdOpen(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return false;
  }
}

export function markColdOpenSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // storage blocked — it will simply play again next visit
  }
}
