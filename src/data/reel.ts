export interface ReelClip {
  id: string;
  timecode: string;
  headline: string;
  quote?: string;
  from: string;
  role: string;
  context?: string;
  documentUrl: string;
  documentLabel: string;
  screenshotUrl?: string;
}

export const featureClip: ReelClip = {
  id: 'eoq',
  timecode: 'Q2 · 2025',
  headline: 'Employee of the Quarter',
  quote:
    'Awarded for building the Copilot Productivity Metrics platform that became the standard measurement tool across 30+ engineering squads.',
  from: 'Sun Life Global Solutions',
  role: 'Quarterly individual award',
  documentUrl: '/recognitions/eoq-certificate.pdf',
  documentLabel: 'View certificate',
};

export const appreciationClips: ReelClip[] = [
  {
    id: 'difference-makers',
    timecode: 'Jul · 2025',
    headline: 'Difference Makers',
    quote:
      'Your lightning-fast delivery and unwavering dedication have set a new standard for excellence within our team. Your innovative approach to creating, supporting, and enhancing the application has been instrumental in its success.',
    from: 'Avijeet Hati',
    role: 'Sun Life Global Solutions',
    context: 'Copilot Value Measurement Platform',
    documentUrl: '/recognitions/applause-difference-makers.pdf',
    documentLabel: 'Original PDF',
    screenshotUrl: '/recognitions/applause-screenshot-1.png',
  },
  {
    id: 'faster-together',
    timecode: 'Jul · 2025',
    headline: 'Faster Together',
    quote:
      'Aum has demonstrated exceptional initiative and technical prowess in single-handedly developing the entire GitHub Co-pilot application from its inception. His commitment to excellence is evident in both the frontend and backend components, showcasing his versatility and comprehensive understanding of full-stack development.',
    from: 'Dharmendra Kumar Rai',
    role: 'Sun Life Global Solutions',
    context: 'Copilot Value Measurement Platform',
    documentUrl: '/recognitions/applause-faster-together.pdf',
    documentLabel: 'Original PDF',
    screenshotUrl: '/recognitions/applause-screenshot-2.png',
  },
];
