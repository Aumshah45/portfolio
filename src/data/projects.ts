import type { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'Copilot Productivity Metrics',
    slug: 'copilot-metrics',
    status: 'shipped',
    statusLabel: 'Shipped',
    problem:
      'Leadership needed to measure whether GitHub Copilot was saving time and justifying its cost across engineering.',
    outcome:
      'Built an end-to-end analytics platform tracking productivity across 30+ squads \u2014 leading to data-driven tooling decisions.',
    metrics: [
      { value: '30+', label: 'Squads Served' },
      { value: 'EoQ', label: 'Award Won' },
    ],
    techTags: ['Flask', 'React', 'Pandas', 'NumPy'],
    visualType: 'dashboard',
    caseStudy: {
      heroTitle: 'Measuring GitHub Copilot ROI Across 30+ Engineering Squads',
      heroSubtitle:
        'How I built a full-stack analytics platform that tracked productivity gains, computed cost savings, and earned Employee of the Quarter.',
      meta: { role: 'Full-Stack Developer', company: 'Sun Life', timeline: '2024 \u2014 2025' },
      sections: [
        {
          label: '01 \u2014 The Problem',
          heading: 'No way to measure Copilot\u2019s actual impact',
          paragraphs: [
            'Sun Life rolled out GitHub Copilot across engineering, but leadership had no data on whether it was actually saving developer time or justifying the license cost.',
            'Teams were submitting effort data through ad-hoc forms and email threads with no standardized format, making aggregation and comparison impossible.',
          ],
        },
        {
          label: '02 \u2014 The Approach',
          heading: 'End-to-end analytics from upload to insight',
          paragraphs: [
            'I designed and built the entire system solo \u2014 from the Flask backend that ingested Excel uploads to the React frontend that visualized productivity trends.',
            'The backend processed raw data using NumPy and Pandas, computing monthly effort savings per squad. The frontend enabled managers to upload files, view dashboards, and export reports.',
          ],
        },
        {
          label: '03 \u2014 Tech Stack',
          heading: 'Simple, effective, production-ready',
          paragraphs: [],
        },
        {
          label: '04 \u2014 Results',
          heading: 'Adopted across the organization',
          paragraphs: [
            'The platform was deployed and used by 30+ engineering squads for monthly productivity reporting. It became the standard tool for Copilot ROI measurement at Sun Life.',
          ],
        },
      ],
      techStack: [
        { name: 'Flask', color: 'green' },
        { name: 'React', color: 'blue' },
        { name: 'Pandas', color: 'yellow' },
        { name: 'NumPy', color: 'yellow' },
        { name: 'Python', color: 'blue' },
        { name: 'SQL', color: 'pink' },
      ],
      resultMetrics: [
        { value: '30+', label: 'Squads Served' },
        { value: 'EoQ', label: 'Award Won' },
        { value: 'Solo', label: 'End-to-End Build' },
      ],
      resultSummary:
        'This project earned me Employee of the Quarter (Q2 2025) and established a standardized productivity measurement framework across the organization.',
    },
  },
  {
    title: 'Document Automation Platform',
    slug: 'document-converter',
    status: 'shipped',
    statusLabel: 'Ongoing',
    problem:
      'Enterprise document processing is more than generating a PDF: records must be validated, templates chosen, content assembled, edited and delivered, and batch and interactive requests need consistent states, failure handling and progress tracking.',
    outcome:
      'Implemented the complete backend, from a supplied architecture: Python services on AWS for batch and on-demand generation, versioned editing, PDF processing, external delivery and notifications.',
    metrics: [
      { value: '3', label: 'API Services' },
      { value: 'Sole', label: 'Implementation Owner' },
    ],
    techTags: ['Python', 'AWS Lambda', 'Step Functions', 'PostgreSQL'],
    visualType: 'flow',
    caseStudy: {
      heroTitle: 'Implementing an Enterprise Document Automation Backend on AWS',
      heroSubtitle:
        'How I turned a supplied architecture into working Python services: batch and on-demand document workflows, versioned editing, PDF bundling and delivery to S3 and IBM FileNet.',
      meta: { role: 'Sole Implementation Owner', company: 'Sun Life', timeline: '2025 \u2014 Present' },
      sections: [
        {
          label: '01 \u2014 The Problem',
          heading: 'A document is more than a PDF',
          paragraphs: [
            'Source records must be validated, templates selected, content assembled, documents edited or rendered, and outputs delivered to the right destination.',
            'Batch jobs and interactive requests also need consistent processing states, failure handling, and a way for consuming applications to track progress.',
          ],
        },
        {
          label: '02 \u2014 The Approach',
          heading: 'From a supplied architecture to working services',
          paragraphs: [
            'The architecture was designed by someone else; I owned its end-to-end implementation: API handlers, workflow transitions, integrations, data-access logic, deployment templates and tests.',
            'Lambda services and Step Functions workflows carry each document from batch registration through eligibility and template validation, content assembly, composition, delivery and notification, with batch, request, content, workitem and artifact states persisted in PostgreSQL.',
            'SQS consumers handle priority-aware deferral, delayed requeueing and partial-batch failures, and hand Step Functions task tokens to child workflows. Three API services (client-facing, internal editing and platform) cover asynchronous generation, status, artifact access and document bundles.',
            'For editable documents I built versioned HTML workitems, editing-session ownership checks, expiring S3 upload and download links, and invalidation of cached PDF previews when the HTML changes. Bundles pull from S3 or IBM FileNet, concatenate PDFs and images, and package ZIPs within stage-by-stage timeout budgets.',
          ],
        },
        {
          label: '03 \u2014 Tech Stack',
          heading: 'Serverless AWS, Python and PostgreSQL',
          paragraphs: [
            'Infrastructure is AWS SAM and CloudFormation, schema changes are versioned Flyway migrations, and Jenkins runs the build and migration pipeline. Automated tests cover API validation, editing conflicts, transaction failures, bundle cleanup and the state-machine definitions.',
          ],
        },
        {
          label: '04 \u2014 Results',
          heading: 'One lifecycle for every document',
          paragraphs: [
            'Batch generation, request-driven processing, editable content, packaging and external delivery now share one backend lifecycle.',
          ],
        },
      ],
      techStack: [
        { name: 'Python', color: 'blue' },
        { name: 'AWS Lambda', color: 'yellow' },
        { name: 'Step Functions', color: 'yellow' },
        { name: 'SQS', color: 'yellow' },
        { name: 'S3', color: 'yellow' },
        { name: 'API Gateway', color: 'yellow' },
        { name: 'PostgreSQL', color: 'blue' },
        { name: 'Flyway', color: 'green' },
        { name: 'AWS SAM', color: 'yellow' },
        { name: 'IBM FileNet', color: 'pink' },
        { name: 'pypdf', color: 'green' },
        { name: 'pytest', color: 'green' },
        { name: 'Jenkins', color: 'pink' },
      ],
      resultMetrics: [
        { value: '3', label: 'API Services' },
        { value: '2', label: 'Delivery Targets' },
        { value: 'Sole', label: 'Implementation Owner' },
      ],
      resultSummary:
        'Consuming applications can request documents, track status, retrieve artifacts and receive notifications without implementing every downstream integration themselves.',
    },
  },
  {
    title: 'Absence Claim Automation',
    slug: 'absence-claim-automation',
    status: 'live',
    statusLabel: 'Live in Production',
    problem:
      'Insurance claim validation was taking 15 days of manual processing per case, creating bottlenecks and delays.',
    outcome:
      'Built an AI platform with intelligent agents that automated the entire workflow \u2014 now processing claims in 3-4 days.',
    metrics: [
      { value: '80%', label: 'TAT Reduction' },
      { value: '3', label: 'AI Agents' },
      { value: '4', label: 'Mentored' },
    ],
    techTags: ['LangChain', 'FastAPI', 'React', 'PostgreSQL'],
    visualType: 'flow',
    caseStudy: {
      heroTitle: 'Automating FMLA Claims with Agentic AI',
      heroSubtitle:
        'How I built and deployed a production AI platform that reduced claim processing from 15 days to 3-4 days using modular AI agents.',
      meta: { role: 'Lead Developer', company: 'Sun Life', timeline: '2025 \u2014 Present' },
      sections: [
        {
          label: '01 \u2014 The Problem',
          heading: 'Manual claim processing was taking 15 days',
          paragraphs: [
            'FMLA leave validation at Sun Life involved manual document review, cross-referencing policy rules, and multi-step approvals. The entire process averaged 15 days per claim.',
            'The challenge: could we automate the end-to-end workflow while maintaining accuracy and compliance?',
          ],
        },
        {
          label: '02 \u2014 The Approach',
          heading: 'Modular agents, each with a clear responsibility',
          paragraphs: [
            'Instead of building a monolithic AI system, I designed three specialized agents that work in sequence \u2014 each owning one phase of the workflow.',
            'Extraction Agent \u2014 parses incoming documents and extracts structured data using LangChain.',
            'Validation Agent \u2014 cross-references extracted data against FMLA policy rules and flags discrepancies.',
            'Decision Engine \u2014 aggregates validation results and surfaces recommendations through a React dashboard.',
          ],
        },
        {
          label: '03 \u2014 Tech Stack',
          heading: 'Built to scale and maintain',
          paragraphs: [],
        },
        {
          label: '04 \u2014 Results',
          heading: 'Measurable impact from day one',
          paragraphs: [
            'Beyond the technical metrics, this project established the foundation for future agentic AI initiatives. I also mentored 4 Graduate Engineer Trainees on the architecture and design patterns.',
          ],
        },
      ],
      beforeAfter: {
        before: { value: '15 days', description: 'Manual processing' },
        after: { value: '3-4 days', description: 'AI-automated' },
      },
      techStack: [
        { name: 'LangChain', color: 'blue' },
        { name: 'FastAPI', color: 'blue' },
        { name: 'React', color: 'green' },
        { name: 'PostgreSQL', color: 'green' },
        { name: 'Python', color: 'yellow' },
        { name: 'REST APIs', color: 'pink' },
      ],
      resultMetrics: [
        { value: '80%', label: 'TAT Reduction' },
        { value: '4', label: 'Engineers Mentored' },
        { value: 'Prod', label: 'Live in Production' },
      ],
      resultSummary:
        'A production AI platform demonstrating agentic architecture design, end-to-end ownership, and technical mentorship.',
    },
  },
  {
    title: 'Numera',
    slug: 'numera',
    status: 'shipped',
    statusLabel: 'Open Source',
    problem:
      'As software agents transact across borders they accumulate currency exposure, but hedging assumes a human, a broker relationship, and a trading UI built for people.',
    outcome:
      'Built a declarative FX / hedging API that agents call to neutralize exposure — spot or forward — with full cost attribution and server-side risk limits.',
    metrics: [
      { value: '6', label: 'Phases Shipped' },
      { value: '60', label: 'Tests Green' },
    ],
    techTags: ['Python', 'FastAPI', 'MCP', 'SQLAlchemy'],
    visualType: 'flow',
    repoUrl: 'https://github.com/Aumshah45/Numera',
    liveUrl: 'https://numera-ri3y.onrender.com/docs',
    caseStudy: {
      heroTitle: 'An agent-first FX & hedging API, built behind a regulated seam',
      heroSubtitle:
        'How I designed a declarative FX micro-execution service — spot conversion and covered-interest-parity forwards — with first-class cost attribution, server-side risk policy, and a swappable execution venue, exposed over both HTTP and MCP.',
      meta: { role: 'Architecture & Solo Build', company: 'Self-directed', timeline: '2026' },
      sections: [
        {
          label: '01 — The Problem',
          heading: 'Agents carry FX risk with no way to manage it',
          paragraphs: [
            'As software agents start paying suppliers and settling invoices across currencies, they accumulate exposure they cannot manage. Existing FX and hedging tools are built around human workflows — dashboards, relationship managers, minimum ticket sizes.',
            'I wanted a clean, small-ticket, programmatic primitive: declare an exposure, get it neutralized, and see exactly what it cost — to the basis point.',
          ],
        },
        {
          label: '02 — The Approach',
          heading: 'A pure core behind one regulated seam',
          paragraphs: [
            'I built a hexagonal core — pure domain logic behind ports, with swappable adapters — so the one regulated piece, execution, lives behind a single seam that a licensed partner could later implement with no change above it.',
            'Agents declare an exposure; the system decides convert versus hedge, prices it (real mid-market rate for spot, covered interest-rate parity for forwards), executes against a simulated venue, and returns a machine-readable fill with itemized cost attribution. Risk policy is enforced server-side, before any trade.',
            'Money is never a float: amounts are integer minor units computed with decimals and half-even rounding, and every fill reconciles exactly to its all-in rate.',
          ],
        },
        {
          label: '03 — Tech Stack',
          heading: 'Typed, tested, dual-surface',
          paragraphs: [],
        },
        {
          label: '04 — Results',
          heading: 'One core, two surfaces, a contract-tested seam',
          paragraphs: [
            'The same use-cases are exposed over a typed HTTP API and an MCP server with behavioural parity, backed by in-memory or SQLite persistence behind the repository ports.',
            'A venue contract suite runs against two independent execution-venue implementations, proving the seam; a sequence of agent calls cannot breach its mandate; and any order is reconstructable from an append-only audit trail with a double-entry ledger.',
          ],
        },
      ],
      beforeAfter: {
        before: { value: 'Trading desk', description: 'Humans, dashboards, minimums' },
        after: { value: 'One API call', description: 'Declare exposure → attributed fill' },
      },
      techStack: [
        { name: 'Python', color: 'blue' },
        { name: 'FastAPI', color: 'green' },
        { name: 'MCP', color: 'pink' },
        { name: 'SQLAlchemy', color: 'yellow' },
        { name: 'Pydantic', color: 'pink' },
        { name: 'REST', color: 'blue' },
      ],
      resultMetrics: [
        { value: 'HTTP + MCP', label: 'Dual Surfaces, One Core' },
        { value: 'CIP', label: 'Forward Pricing' },
        { value: '60', label: 'Tests · mypy · ruff' },
      ],
      resultSummary:
        'A portfolio-grade system that proves the hard parts — exact money math, honest cost attribution, server-side risk policy, and a contract-tested venue seam — while deliberately staying behind a simulated venue, since real execution is a regulated, deferred milestone.',
    },
  },
  {
    title: 'AgentWatch',
    slug: 'agentwatch',
    status: 'shipped',
    statusLabel: 'Open Source',
    problem:
      'AI agents depend on third-party MCP servers that can break silently: a renamed tool, a changed input schema, or a plausible but wrong answer, all behind a healthy HTTP 200.',
    outcome:
      'Built synthetic agent probes that test MCP servers end to end, from reachability to LLM-judged answers, and rank them on a reliability dashboard.',
    metrics: [
      { value: 'L1-L4', label: 'Check Ladder' },
      { value: '33', label: 'Tests Green' },
    ],
    techTags: ['TypeScript', 'Next.js', 'MCP', 'Drizzle'],
    visualType: 'flow',
    repoUrl: 'https://github.com/Aumshah45/ChnAI',
    caseStudy: {
      heroTitle: 'Uptime monitoring for the agent supply chain',
      heroSubtitle:
        'How I built synthetic agent probes that call MCP servers the way an agent does, catch schema drift and silent semantic failures, and turn the results into a ranked reliability score.',
      meta: { role: 'Architecture & Solo Build', company: 'Self-directed', timeline: '2026' },
      sections: [
        {
          label: '01 — The Problem',
          heading: '“HTTP 200, wrong answer”',
          paragraphs: [
            'Agents increasingly call tools through third-party MCP servers, and most of those servers have no SLOs, no error budgets and no drift detection. Existing agent observability traces your own agent from the inside; nothing tests the dependencies from the outside.',
            'The failures that hurt are the quiet ones: a tool renamed, an input schema changed, or an answer that looks plausible but is wrong. A ping reports all of them as healthy.',
          ],
        },
        {
          label: '02 — The Approach',
          heading: 'Probe like an agent, then judge the answer',
          paragraphs: [
            'Every server runs through a four-level check ladder: L1 reachability and latency, L2 the MCP handshake and tool listing, L3 real tool calls on canary tools with fixed inputs, and L4 an LLM judge that scores the output against a known-good baseline.',
            'Tool schemas are normalised and hashed on every run, so a renamed or changed tool shows up as drift. Scoring and incident transitions are pure functions over stored results, so they can be replayed and recomputed whenever the weights change.',
            'The LLM judge is cost-controlled from day one: identical outputs reuse a cached judgment, judging is sampled or triggered by anomalies, and calls are capped per server per day. If the judge is unavailable, the score falls back to the structural checks.',
          ],
        },
        {
          label: '03 — Tech Stack',
          heading: 'A typed monorepo with two deployable units',
          paragraphs: [],
        },
        {
          label: '04 — Results',
          heading: 'Ranked, alerted, deploy-ready',
          paragraphs: [
            'A long-running prober and a read-only Next.js dashboard share one domain core. The dashboard ranks servers by a 0-100 composite score and shows latency history, incidents and schema-drift timelines.',
            'Alerts fire once per incident transition, never per failed check. Storage runs on SQLite locally and switches to Postgres through the same store functions, with the Postgres path tested via PGlite.',
          ],
        },
      ],
      beforeAfter: {
        before: { value: 'Ping', description: 'Reachable, so assumed healthy' },
        after: { value: 'L1-L4', description: 'Handshake, real tool calls, judged answers' },
      },
      techStack: [
        { name: 'TypeScript', color: 'blue' },
        { name: 'Next.js', color: 'pink' },
        { name: 'MCP SDK', color: 'green' },
        { name: 'Drizzle', color: 'yellow' },
        { name: 'SQLite / Postgres', color: 'blue' },
        { name: 'Claude Haiku', color: 'pink' },
      ],
      resultMetrics: [
        { value: 'L1-L4', label: 'Check Ladder' },
        { value: '0-100', label: 'Composite Score' },
        { value: '33', label: 'Tests · Mock MCP Server' },
      ],
      resultSummary:
        'A working monitor for a dependency nobody watches: probes that behave like agents, a judge whose cost is engineered down, and scoring that stays replayable because it is pure.',
    },
  },
];
