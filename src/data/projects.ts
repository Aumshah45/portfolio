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
    title: 'Document Converter Platform',
    slug: 'document-converter',
    status: 'shipped',
    statusLabel: 'Shipped',
    problem:
      'Enterprise teams needed reliable document format conversion with consistent output quality at scale.',
    outcome:
      'Built a cloud-native pipeline with AI-driven automation achieving 85% accuracy in document processing.',
    metrics: [
      { value: '85%', label: 'AI Accuracy' },
      { value: 'AWS', label: 'Cloud-Native' },
    ],
    techTags: ['AWS', 'TypeScript', 'React', 'Step Functions'],
    visualType: 'chart',
    caseStudy: {
      heroTitle: 'Building a Cloud-Native Document Pipeline on AWS',
      heroSubtitle:
        'How I engineered an enterprise document conversion platform with AWS orchestration and AI-driven automation achieving 85% accuracy.',
      meta: { role: 'Full-Stack Developer', company: 'Sun Life', timeline: '2025 \u2014 Present' },
      sections: [
        {
          label: '01 \u2014 The Problem',
          heading: 'Manual document conversion at enterprise scale',
          paragraphs: [
            'Enterprise teams needed to convert documents across formats (JSON, XML to PDF) with consistent output quality. The existing process was manual, slow, and error-prone.',
          ],
        },
        {
          label: '02 \u2014 The Approach',
          heading: 'Cloud-native orchestration with reusable components',
          paragraphs: [
            'I built reusable Storybook components using TypeScript, React, and MUI for the frontend. On the backend, I integrated PrinceXML for PDF generation from JSON/XML inputs.',
            'The entire pipeline was orchestrated using AWS Step Functions and Lambda, with IAM roles configured for security and S3 for storage. Jenkins CI/CD pipelines ensured reliable deployments.',
            'I also developed an AI-driven automation layer that achieved 85% accuracy in document processing, significantly reducing manual intervention.',
          ],
        },
        {
          label: '03 \u2014 Tech Stack',
          heading: 'AWS-powered, component-driven',
          paragraphs: [],
        },
        {
          label: '04 \u2014 Results',
          heading: 'Reliable at scale',
          paragraphs: [
            'The platform processes documents reliably at enterprise scale with minimal manual intervention. The AI automation layer continues to improve, reducing processing time and errors.',
          ],
        },
      ],
      techStack: [
        { name: 'AWS', color: 'yellow' },
        { name: 'TypeScript', color: 'blue' },
        { name: 'React', color: 'blue' },
        { name: 'Step Functions', color: 'yellow' },
        { name: 'PrinceXML', color: 'green' },
        { name: 'Jenkins', color: 'pink' },
      ],
      resultMetrics: [
        { value: '85%', label: 'AI Accuracy' },
        { value: 'AWS', label: 'Cloud-Native' },
        { value: 'CI/CD', label: 'Automated Deploy' },
      ],
      resultSummary:
        'A production-grade document pipeline demonstrating cloud architecture, component-driven frontend, and AI integration capabilities.',
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
];
