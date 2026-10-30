export interface ScoresheetMove {
  no: string;
  text: string;
  glyph?: string;
  note: string;
  /** Engine evaluation after the move; null = the visitor's move, still to be played. */
  evaluation: number | null;
}

export const scoresheet: ScoresheetMove[] = [
  { no: '1.', text: 'B.Tech CSE, SRM, 9.08', glyph: '⩲', note: 'solid opening, no early weaknesses', evaluation: 0.3 },
  { no: '2.', text: 'Sun Life, graduate trainee', note: 'developing the pieces', evaluation: 0.5 },
  { no: '3.', text: 'Copilot platform, solo, six weeks', glyph: '!!', note: '30+ squads; quarter decided', evaluation: 2.1 },
  { no: '4.', text: 'Claims agents, live in production', glyph: '!', note: '15 days to 3-4; four mentored', evaluation: 2.7 },
  { no: '5.', text: 'Promoted: Associate Analyst Development', note: 'position improved', evaluation: 3.0 },
  { no: '6.', text: 'Numera, agent-first FX API', glyph: '!?', note: 'one core, two surfaces, open source', evaluation: 3.4 },
  { no: '7.', text: '…', note: 'your move.', evaluation: null },
];

/** The !! move — where the panel rests before any interaction. */
export const scoresheetRestingMove = 2;
