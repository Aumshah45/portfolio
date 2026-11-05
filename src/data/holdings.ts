import type { Move } from '../components/ui/Movelist';

export interface RelayNode {
  label: string;
  title: string;
  body: string;
}

export interface Holding {
  slug: string;
  /** What kind of thing it is, in plain words, and where it lives. */
  category: string;
  headline: {
    value: string;
    /** Short unit shown in the ledger row. */
    unit: string;
    /** Full sentence shown on the term sheet. */
    label: string;
  };
  award?: string;
  built: string;
  keyDecision: string;
  diagram: { kind: 'relay'; nodes: RelayNode[] } | { kind: 'hex' };
}

export const numeraCore = {
  portA: { label: 'Surface A · HTTP', body: 'A typed REST API. Declare exposure, receive a machine-readable, cost-attributed fill.' },
  core: { label: 'PURE CORE', note: 'money as integer minor units, half-even rounding' },
  portB: { label: 'Surface B · MCP', body: 'The same use-cases over MCP, with behavioural parity, so agents call it natively.' },
  seam: 'Execution seam · contract-tested against two venues · simulated today, a licensed partner later',
};

/** Ledger order: strongest return first. */
export const holdings: Holding[] = [
  {
    slug: 'copilot-metrics',
    category: 'Analytics platform · Sun Life',
    headline: { value: '30+', unit: 'squads', label: 'engineering squads measure Copilot ROI on it every month' },
    award: 'Employee of the Quarter · Q2 2025',
    built:
      'A full-stack measurement platform. Squads upload effort data, a Flask backend with Pandas and NumPy computes monthly time saved, and a React dashboard shows the trends and exports reports.',
    keyDecision:
      'Build it alone, schema to deploy, instead of waiting for a team. It shipped in six weeks and became the standard Copilot ROI tool.',
    diagram: {
      kind: 'relay',
      nodes: [
        { label: 'Step 1', title: 'Excel upload', body: 'Squads submit raw effort data' },
        { label: 'Step 2', title: 'Flask backend', body: 'Pandas + NumPy compute time saved' },
        { label: 'Step 3', title: 'React dashboard', body: 'Trends per squad and month' },
        { label: 'Step 4', title: 'Reports', body: 'Exports for leadership' },
      ],
    },
  },
  {
    slug: 'absence-claim-automation',
    category: 'Agentic AI system · Sun Life',
    headline: { value: '80%', unit: 'faster', label: 'faster claim reviews: 15 days down to 3-4, live in production' },
    built:
      'Three LangChain agents that work in sequence. One extracts data from claim documents, one checks it against FMLA policy rules, and one recommends a decision on a React dashboard.',
    keyDecision:
      'Three small agents instead of one monolith, so a failure stays inside one step and every hand-off can be inspected. I mentored four graduate engineers through the build.',
    diagram: {
      kind: 'relay',
      nodes: [
        { label: 'Agent 1', title: 'Extraction', body: 'Parses claim documents into structured data' },
        { label: 'Agent 2', title: 'Validation', body: 'Checks the data against FMLA policy rules' },
        { label: 'Agent 3', title: 'Decision', body: 'Recommends an outcome on a dashboard' },
      ],
    },
  },
  {
    slug: 'numera',
    category: 'Open-source FX API · personal project',
    headline: { value: '60', unit: 'tests', label: 'tests passing, with exact money math and one core behind two interfaces' },
    built:
      'An API that lets software agents neutralise currency exposure. An agent declares its exposure; Numera prices a spot or forward trade, enforces risk limits, executes against a simulated venue, and returns an itemised cost.',
    keyDecision:
      'Keep all business logic in a pure core behind interfaces, so the one regulated piece, trade execution, can later move to a licensed partner without changing anything above it.',
    diagram: { kind: 'hex' },
  },
  {
    slug: 'agentwatch',
    category: 'Open-source monitoring tool · personal project',
    headline: { value: '4', unit: 'levels', label: 'check levels per server, from reachability to LLM-judged answers' },
    built:
      'A TypeScript monorepo. A prober connects to MCP servers the way an agent does, runs real tool calls, hashes tool schemas to catch drift, and uses an LLM judge for plausible-but-wrong answers. A Next.js dashboard ranks the servers by reliability.',
    keyDecision:
      'Keep scoring and incident logic as pure functions over stored results, so every score can be replayed when the weights change, and alert once per incident, never once per failed check.',
    diagram: {
      kind: 'relay',
      nodes: [
        { label: 'Step 1', title: 'Registry', body: 'MCP servers and their canary checks' },
        { label: 'Step 2', title: 'Prober', body: 'L1-L4 checks plus schema hashing' },
        { label: 'Step 3', title: 'Scoring', body: '0-100 score and an incident state machine' },
        { label: 'Step 4', title: 'Dashboard + alerts', body: 'Rankings, one alert per incident' },
      ],
    },
  },
  {
    slug: 'document-converter',
    category: 'Document automation backend · Sun Life',
    headline: { value: '3', unit: 'API services', label: 'API services over one document lifecycle, from batch generation to delivery' },
    built:
      'The complete backend of an enterprise document platform, from a supplied architecture: Lambda and Step Functions workflows with SQS queueing, three API services, versioned editing, PDF and image bundling, and delivery to S3 and IBM FileNet.',
    keyDecision:
      'Let the queue worker report only startup failures and leave completion to the child workflows, so each Step Functions callback, which can be resolved only once, has exactly one owner.',
    diagram: {
      kind: 'relay',
      nodes: [
        { label: 'Step 1', title: 'Register and validate', body: 'Batch or request, eligibility and template checks' },
        { label: 'Step 2', title: 'Assemble and compose', body: 'External services, HTML streamed to S3' },
        { label: 'Step 3', title: 'Edit and bundle', body: 'Versioned HTML, PDF and ZIP packaging' },
        { label: 'Step 4', title: 'Deliver and notify', body: 'S3 or IBM FileNet, then notifications' },
      ],
    },
  },
];

/** Annotated decisions shown on each case-study page. */
export const caseMoves: Record<string, Move[]> = {
  'copilot-metrics': [
    { no: '1.', text: 'Build it alone, schema to deploy', glyph: '!!', note: 'two senior engineers sent recognitions in the same week' },
    { no: '2.', text: 'Six weeks, no second engineer', glyph: '!?', note: 'risky tempo; the position held' },
  ],
  'absence-claim-automation': [
    { no: '1.', text: 'Three agents instead of one monolith', glyph: '!', note: 'failures stay local, hand-offs stay inspectable' },
    { no: '2.', text: 'Mentor four trainees on the build', glyph: '!', note: 'the position improves when the pieces develop each other' },
  ],
  numera: [
    { no: '1.', text: 'A pure core behind one regulated seam', glyph: '!!', note: 'execution can move to a licensed partner untouched' },
    { no: '2.', text: 'Price forwards by covered interest parity', glyph: '!?', note: 'ambitious; sixty tests, mypy and ruff say it is sound' },
  ],
  agentwatch: [
    { no: '1.', text: 'Probe the way an agent calls, not with pings', glyph: '!!', note: 'catches the “HTTP 200, wrong answer” failures' },
    { no: '2.', text: 'Cache, sample and cap the LLM judge from day one', glyph: '!', note: 'semantic checks without a runaway bill' },
  ],
  'document-converter': [
    { no: '1.', text: 'One owner for every workflow callback', glyph: '!', note: 'the queue reports startup failures; child workflows report completion' },
    { no: '2.', text: 'Budget the time left in synchronous bundles', glyph: '!', note: 'a controlled timeout and an async path, never a half-deleted temp file' },
    { no: '3.', text: 'Pass S3 references, not documents', glyph: '!', note: 'streamed HTML and presigned uploads keep large payloads off the wire' },
  ],
};
