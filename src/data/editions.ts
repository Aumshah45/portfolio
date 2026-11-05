/**
 * The work as a numbered collection. Each edition is one project, numbered in
 * the order it was made; the cover art is drawn from the project itself.
 * Every figure here is measured or counted, never projected.
 */
export type CoverVariant = 'metrics' | 'agents' | 'pages' | 'hex' | 'orbit' | 'sealed';

export interface Edition {
  no: string;
  /** Case-study route; Shield has none, its notes stay private. */
  slug?: string;
  variant: CoverVariant;
  title: string;
  spine: string;
  /** Spine size on the shelf, in px. */
  w: number;
  h: number;
  year: string;
  since: string;
  what: string;
  kpi: { value: string; unit: string };
  status: { label: string; live: boolean };
  line: string;
  specs: [string, string][];
  band: [string, string];
  tagline: string;
}

export const editions: Edition[] = [
  {
    no: '001',
    slug: 'copilot-metrics',
    variant: 'metrics',
    title: 'Copilot Productivity Metrics',
    spine: 'Copilot Metrics',
    w: 96,
    h: 214,
    year: '2024 to 2025',
    since: '2024',
    what: 'Developer analytics platform',
    kpi: { value: '30+', unit: 'squads' },
    status: { label: 'Standard tool', live: true },
    line: 'Built solo in six weeks to measure what GitHub Copilot was saving. It became the standard tool for 30+ engineering squads.',
    specs: [
      ['Runtime', 'Six weeks, one engineer'],
      ['Format', 'Flask, React, SQL, Pandas'],
      ['Return', '30+ squads, monthly'],
      ['Award', 'Employee of the Quarter, Q2 2025'],
    ],
    band: ['No. 001', '!!'],
    tagline: 'Six weeks. One engineer. Thirty squads.',
  },
  {
    no: '002',
    slug: 'absence-claim-automation',
    variant: 'agents',
    title: 'Absence Claim Automation',
    spine: 'Claim Automation',
    w: 108,
    h: 236,
    year: '2025 to present',
    since: '2025',
    what: 'Agentic AI in production',
    kpi: { value: '3-4', unit: 'days, from 15' },
    status: { label: 'In production', live: true },
    line: 'Three LangChain agents in sequence, extraction, validation and decision, live in production on FMLA claims.',
    specs: [
      ['Runtime', '15 days down to 3-4'],
      ['Format', 'LangChain, Bedrock, FastAPI'],
      ['Cast', 'Three agents, four trainees mentored'],
      ['Status', 'Live in production'],
    ],
    band: ['No. 002', '3 agents'],
    tagline: 'From fifteen days to three or four.',
  },
  {
    no: '003',
    slug: 'document-converter',
    variant: 'pages',
    title: 'Document Automation Platform',
    spine: 'Document Platform',
    w: 92,
    h: 226,
    year: '2025 to present',
    since: '2025',
    what: 'Serverless document backend',
    kpi: { value: '3', unit: 'API services' },
    status: { label: 'Ongoing', live: false },
    line: 'The whole backend of an enterprise document platform, built from a supplied architecture: workflows, editing, bundling, delivery.',
    specs: [
      ['Runtime', 'Ongoing'],
      ['Format', 'Lambda, Step Functions, SQS'],
      ['Return', '3 API services, 2 delivery targets'],
      ['Credit', 'Sole implementation owner'],
    ],
    band: ['No. 003', 'S3 / FileNet'],
    tagline: 'Batch to delivery, one lifecycle.',
  },
  {
    no: '004',
    slug: 'numera',
    variant: 'hex',
    title: 'Numera',
    spine: 'Numera',
    w: 84,
    h: 204,
    year: '2026',
    since: '2026',
    what: 'Open-source FX API for agents',
    kpi: { value: '60', unit: 'tests' },
    status: { label: 'Open source', live: true },
    line: 'An agent-first FX and hedging API: one hexagonal core served over HTTP and MCP, with exact money math.',
    specs: [
      ['Runtime', 'Six phases'],
      ['Format', 'Python, FastAPI, MCP'],
      ['Return', '60 tests, live docs'],
      ['Licence', 'Open source'],
    ],
    band: ['No. 004', 'Open source'],
    tagline: 'One core, two surfaces.',
  },
  {
    no: '005',
    slug: 'agentwatch',
    variant: 'orbit',
    title: 'AgentWatch',
    spine: 'AgentWatch',
    w: 100,
    h: 232,
    year: '2026',
    since: '2026',
    what: 'Open-source MCP monitoring',
    kpi: { value: '13', unit: 'servers ranked' },
    status: { label: 'Open source', live: true },
    line: 'Synthetic agent probes that test public MCP servers end to end and rank them, so “HTTP 200, wrong answer” stops slipping through.',
    specs: [
      ['Runtime', 'Rolling 24 hours'],
      ['Format', 'TypeScript, Next.js, Drizzle'],
      ['Return', 'Four check levels, 13 servers'],
      ['Licence', 'Open source'],
    ],
    band: ['No. 005', 'L1 to L4'],
    tagline: 'Probe like an agent, then judge the answer.',
  },
  {
    no: '006',
    variant: 'sealed',
    title: 'Shield',
    spine: 'Shield',
    w: 78,
    h: 196,
    year: 'Ongoing',
    since: 'Ongoing',
    what: 'Personal investing automation',
    kpi: { value: 'Sealed', unit: 'rules private' },
    status: { label: 'Private', live: false },
    line: 'A personal investing system that runs unattended and messages only when there is something to act on. The rules stay private.',
    specs: [
      ['Runtime', 'Daily, unattended'],
      ['Format', 'Python, broker API, Telegram'],
      ['Screening', 'Private'],
      ['Rules', 'Sealed'],
    ],
    band: ['No. 006', 'Private screening'],
    tagline: 'The strategy stays sealed.',
  },
];

export const editionBySlug = (slug: string) => editions.find((e) => e.slug === slug);

/** The four figures at a glance, each one measured. */
export const highlights = [
  { count: 30, after: '+', small: '', label: 'engineering squads report Copilot savings on a platform I built solo' },
  { count: 3, after: '-4', small: 'days', label: 'days per routine claim review, down from 15, with three agents in production' },
  { count: 60, after: '', small: '', label: "tests behind Numera's exact money math, over HTTP and MCP" },
  { count: null, after: 'Q2', small: '2025', label: 'Employee of the Quarter, Sun Life Global Solutions' },
];
