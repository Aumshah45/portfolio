/** "2024 — 2025" reads as "2024 to 2025"; the site carries no dashes. */
export const span = (timeline: string) => timeline.replace(/\s*[—–-]\s*/g, ' to ').replace(/Present/, 'present');
