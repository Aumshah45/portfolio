import type { Command } from '../types';

export const commands: Command[] = [
  // Sections, in page order
  { id: 'top', icon: '', title: 'The collection', description: 'AUM, as in Asset Under Management', action: 'scroll', target: 'top' },
  { id: 'work', icon: '', title: 'At a glance', description: 'Four figures and every edition in one table', action: 'scroll', target: 'work' },
  { id: 'about', icon: '', title: 'Liner notes', description: 'About me, and the recognition', action: 'scroll', target: 'about' },
  { id: 'risks', icon: '', title: 'Risk factors', description: 'The honest version, before you ask', action: 'scroll', target: 'risks' },
  { id: 'questions', icon: '', title: 'Commentary track', description: 'Questions from a first call, answered', action: 'scroll', target: 'questions' },
  { id: 'contact', icon: '', title: 'Contact', description: 'Edition 007 could be yours', action: 'scroll', target: 'contact' },

  // Actions
  { id: 'resume', icon: '', title: 'Download résumé', description: 'PDF, latest version', action: 'download', target: '/Aum_Shah_Resume.pdf' },
  { id: 'theme', icon: '', title: 'Switch theme', description: 'Light or dark', action: 'theme', target: '' },

  // External
  { id: 'github', icon: '', title: 'GitHub', description: 'View my code', action: 'external', target: 'https://github.com/Aumshah45' },
  { id: 'linkedin', icon: '', title: 'LinkedIn', description: 'Connect with me', action: 'external', target: 'https://www.linkedin.com/in/aum-shah-34a3871ba' },
];
