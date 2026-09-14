import type { Move } from '../components/ui/Movelist';

/** Ticker symbol per project slug — the identity mark on slates and case studies. */
export const tickerSymbol: Record<string, string> = {
  'copilot-metrics': 'CPLT',
  'document-converter': 'DOCS',
  'absence-claim-automation': 'CLMS',
  numera: 'NMRA',
};

export interface RelayNode {
  label: string;
  title: string;
  body: string;
}

export const copilotHolding = {
  slug: 'copilot-metrics',
  code: '02.1 · CPLT',
  take: 'take: solo, six weeks',
  title: 'The quarter-deciding move.',
  ledes: [
    'Sun Life rolled out GitHub Copilot with no way to tell whether it was saving time or justifying its cost. Effort data arrived in ad-hoc forms and email threads that could not be aggregated.',
    'I built the entire measurement platform alone in six weeks: a Flask backend ingesting squad uploads, Pandas and NumPy computing monthly effort savings, a React frontend where managers see trends and export reports.',
  ],
  moves: [
    { no: '3.', text: 'Build it alone, schema to deploy', glyph: '!!', note: 'two senior engineers sent recognitions in the same week' },
    { no: '3…', text: 'six weeks, no second engineer', glyph: '!?', note: 'risky tempo; the position held' },
  ] satisfies Move[],
  bignum: '+30',
  bignumLabel: 'squads on the platform',
  tags: ['Flask · React · Pandas'],
  award: 'Employee of the Quarter · Q2 2025',
};

export const claimsHolding = {
  slug: 'absence-claim-automation',
  code: '02.2 · CLMS',
  take: 'take: lead, with four trainees',
  title: 'Three agents, one relay.',
  lede: 'FMLA claim validation averaged fifteen days of manual document review, policy cross-referencing and approvals. Instead of one monolithic AI system, I designed three specialised agents, each owning one phase, so failures stay local and every hand-off is inspectable.',
  relay: [
    { label: 'Agent 01', title: 'Extraction', body: 'Parses incoming documents into structured data with LangChain.' },
    { label: 'Agent 02', title: 'Validation', body: 'Cross-references extractions against FMLA policy rules; flags discrepancies.' },
    { label: 'Agent 03', title: 'Decision', body: 'Aggregates results and surfaces recommendations in a React dashboard.' },
  ] satisfies RelayNode[],
  before: { value: '15 days', caption: 'manual processing, per claim' },
  after: { value: '3-4 days', caption: 'live in production · 80% cut' },
  moves: [
    { no: '4.', text: 'Mentor four trainees on the build', glyph: '!', note: 'the position improves when the pieces develop each other' },
  ] satisfies Move[],
};

export const numeraHolding = {
  slug: 'numera',
  code: '02.3 · NMRA',
  take: 'take: self-directed · open source',
  title: 'A pure core behind one regulated seam.',
  lede: 'As software agents pay suppliers across currencies, they accumulate FX exposure with no way to manage it; hedging tools assume a human, a broker and a dashboard. Numera is the missing primitive: declare an exposure, get it neutralised, spot or forward, and see exactly what it cost, to the basis point.',
  portA: { label: 'Surface A · HTTP', body: 'A typed REST API. Declare exposure, receive a machine-readable, cost-attributed fill.' },
  core: { label: 'PURE CORE', note: 'money as integer minor units, half-even rounding' },
  portB: { label: 'Surface B · MCP', body: 'The same use-cases over MCP, with behavioural parity, so agents call it natively.' },
  seam: 'venue seam · contract-tested against two implementations · simulated today, licensed partner later',
  moves: [
    { no: '6.', text: 'Price forwards by covered interest parity', glyph: '!?', note: 'ambitious novelty; sixty tests, mypy and ruff say the position is sound' },
  ] satisfies Move[],
};

export interface BookItem {
  kicker: string;
  title: string;
  body: string;
  href?: string;
}

export const book: BookItem[] = [
  {
    kicker: 'Also on the book',
    title: 'Document pipeline, AWS',
    body: 'Enterprise conversion with Step Functions, Lambda and PrinceXML; the AI layer automates 85% of processing.',
    href: '/projects/document-converter',
  },
  {
    kicker: 'Research',
    title: 'IoT botnet detection',
    body: 'Published at the IEEE 15th ICCCNT; the security instinct carries into every system above.',
  },
  {
    kicker: 'Ratings',
    title: 'AWS & Stanford ML certified',
    body: 'B.Tech CSE from SRM Institute, CGPA 9.08 of 10.',
  },
];

/** Pipeline diagrams for case-study pages, restyled from the old emoji nodes. */
export const casePipelines: Record<string, RelayNode[]> = {
  'copilot-metrics': [
    { label: 'Ingest', title: 'Excel upload', body: 'Raw squad effort data' },
    { label: 'Compute', title: 'Flask backend', body: 'Pandas + NumPy' },
    { label: 'Visualise', title: 'React dashboard', body: 'Trends per squad' },
    { label: 'Export', title: 'Reports', body: '30+ squads' },
  ],
  'absence-claim-automation': [
    { label: 'Agent 01', title: 'Extraction', body: 'LangChain parses claim documents' },
    { label: 'Agent 02', title: 'Validation', body: 'FMLA policy rules engine' },
    { label: 'Agent 03', title: 'Decision', body: 'Recommendations on a dashboard' },
  ],
  'document-converter': [
    { label: 'Input', title: 'JSON / XML', body: 'Enterprise documents' },
    { label: 'Orchestrate', title: 'Step Functions', body: 'Lambda + IAM' },
    { label: 'Convert', title: 'PrinceXML', body: 'PDF generation' },
    { label: 'Store', title: 'S3', body: 'Output bucket' },
  ],
};

/** Annotated decisions shown on each case-study page. */
export const caseMoves: Record<string, Move[]> = {
  'copilot-metrics': copilotHolding.moves,
  'absence-claim-automation': claimsHolding.moves,
  numera: numeraHolding.moves,
  'document-converter': [
    { no: '5.', text: 'Orchestrate on Step Functions, not a monolith', glyph: '!', note: 'every stage retryable and observable on its own' },
  ],
};
