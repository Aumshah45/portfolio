import type { Service } from '../types';

export const services: Service[] = [
  {
    title: 'Web Application Development',
    description:
      'Custom dashboards, internal tools, and full-stack web applications. Responsive, fast, and production-ready.',
    icon: '\uD83D\uDCBB',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    examples: ['Dashboards', 'Internal Tools', 'Web Apps', 'Admin Panels'],
  },
  {
    title: 'Data & Analytics Platforms',
    description:
      'Turn data into actionable insights. Analytics platforms that help teams track metrics and make better decisions.',
    icon: '\uD83D\uDCC8',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    examples: ['Analytics', 'Reporting', 'Data Pipelines'],
  },
  {
    title: 'AI & Automation Solutions',
    description:
      'Automate repetitive tasks with intelligent AI systems. From document processing to decision engines.',
    icon: '\uD83E\uDD16',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    examples: ['AI Agents', 'Document Processing', 'Workflows'],
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Reliable cloud architecture on AWS. Serverless functions, CI/CD pipelines, smooth deployments at scale.',
    icon: '\u2601\uFE0F',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    examples: ['AWS', 'CI/CD', 'Serverless'],
  },
];
