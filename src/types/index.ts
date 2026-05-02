export interface ProjectMetric {
  value: string;
  label: string;
}

export interface CaseStudySection {
  label: string;
  heading: string;
  paragraphs: string[];
}

export interface BeforeAfter {
  before: { value: string; description: string };
  after: { value: string; description: string };
}

export interface TechItem {
  name: string;
  color: 'blue' | 'green' | 'yellow' | 'pink';
}

export interface Project {
  title: string;
  slug: string;
  status: 'live' | 'shipped';
  statusLabel: string;
  problem: string;
  outcome: string;
  metrics: ProjectMetric[];
  techTags: string[];
  visualType: 'flow' | 'chart' | 'dashboard';
  caseStudy: {
    heroTitle: string;
    heroSubtitle: string;
    meta: { role: string; company: string; timeline: string };
    sections: CaseStudySection[];
    beforeAfter?: BeforeAfter;
    techStack: TechItem[];
    resultMetrics: ProjectMetric[];
    resultSummary: string;
  };
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  examples: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface CredentialItem {
  title: string;
  subtitle: string;
  date?: string;
}

export interface CredentialCategory {
  category: string;
  items: CredentialItem[];
}

export interface Command {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: 'scroll' | 'theme' | 'external' | 'download';
  target: string;
}
