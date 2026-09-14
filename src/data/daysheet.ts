import { services } from './services';

export interface DaySheetRow {
  label: string;
  value: string;
}

export const daySheet: DaySheetRow[] = [
  {
    label: 'Holding',
    value: 'Copilot metrics platform: extending cohort analytics across 30+ engineering squads.',
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
    value: services.map((s) => s.title).join(' · '),
  },
];

export const daySheetStatus = 'open to offers · bengaluru / remote';
