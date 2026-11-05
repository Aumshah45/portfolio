import { services } from './services';

export interface DaySheetRow {
  label: string;
  value: string;
}

export const daySheet: DaySheetRow[] = [
  {
    label: 'Holding',
    value: 'Copilot metrics platform: extending its cohort analytics.',
  },
  {
    label: 'Last fill',
    value: 'Numera, an agent-first FX and hedging API. One hexagonal core, two surfaces: HTTP and MCP.',
  },
  {
    label: 'Research desk',
    value: 'Multi-agent systems: several models reasoning together without making a mess.',
  },
  {
    label: 'Takes on',
    value: services.map((s) => s.title).join(', '),
  },
];

export const daySheetStatus = 'open to offers, Bengaluru or remote';

/** The one line on where the work happens. */
export const aboutLine =
  'Most of my work happens at the messy intersection of full-stack engineering and applied AI: data pipelines, internal tools, agentic systems.';

/** Off the clock: what the old ticker carried besides the work. */
export const offTheClock = 'Off the clock: chess, for the long game; test-match cricket, as a purist; cinema, on second viewings.';
