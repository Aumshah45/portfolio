import { useEffect } from 'react';

/**
 * Logs a styled greeting to the browser console exactly once per session.
 * Visible only to people who open devtools — a small nod to the curious.
 */
export function useConsoleGreeting() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const KEY = '__aum_greeted__';
    const w = window as typeof window & Record<string, unknown>;
    if (w[KEY]) return;
    w[KEY] = true;

    const banner = `
   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Hi, I'm Aum.                                   │
   │                                                  │
   │   You opened the console — that's already a      │
   │   good sign. I'm currently taking on freelance   │
   │   projects (web apps, dashboards, agentic AI).   │
   │                                                  │
   │   The site you're looking at: hand-built in      │
   │   React, TypeScript, Tailwind v4, Framer Motion. │
   │   No template, no agency, no bullshit.           │
   │                                                  │
   │   If something here intrigues you, the best way  │
   │   to start a conversation is one paragraph by    │
   │   email — what you're trying to build, who it's  │
   │   for, and a rough timeline.                     │
   │                                                  │
   │   → shahaum999@gmail.com                         │
   │                                                  │
   └──────────────────────────────────────────────────┘
    `;

    const headline = 'background:#b45309;color:#fbf7ef;font-weight:600;font-size:13px;padding:6px 14px;border-radius:6px;font-family:JetBrains Mono,monospace;';
    const body = 'color:#4f4a42;font-family:JetBrains Mono,monospace;font-size:12px;line-height:1.5;';

    // eslint-disable-next-line no-console
    console.log('%cAUM SHAH — PORTFOLIO', headline);
    // eslint-disable-next-line no-console
    console.log(`%c${banner}`, body);
  }, []);
}
