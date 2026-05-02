import type { Command } from '../types';

export const commands: Command[] = [
  // Section navigation — ordered to match the chapter numbering 01–10
  { id: 'services', icon: '02', title: 'What I build', description: 'Services & shapes of project', action: 'scroll', target: 'services' },
  { id: 'process', icon: '03', title: 'How I work', description: 'My four-step process', action: 'scroll', target: 'process' },
  { id: 'honest', icon: '04', title: 'Honest answers', description: 'Five questions, answered straight', action: 'scroll', target: 'honest' },
  { id: 'work', icon: '05', title: 'Selected work', description: 'Case studies & projects', action: 'scroll', target: 'work' },
  { id: 'about', icon: '06', title: 'A short letter', description: 'Background & approach', action: 'scroll', target: 'about' },
  { id: 'skills', icon: '07', title: 'The toolbox', description: 'Tech I work with', action: 'scroll', target: 'skills' },
  { id: 'recognition', icon: '08', title: 'Recognition', description: 'Awards & appreciation', action: 'scroll', target: 'recognition' },
  { id: 'credentials', icon: '09', title: 'The transcript', description: 'Experience, education, certs', action: 'scroll', target: 'credentials' },
  { id: 'contact', icon: '10', title: 'Get in touch', description: 'Send me an email', action: 'scroll', target: 'contact' },

  // Actions
  { id: 'resume', icon: '↓', title: 'Download résumé', description: 'PDF, latest version', action: 'download', target: '/Aum_Shah_Resume.pdf' },
  { id: 'theme', icon: '☾', title: 'Toggle theme', description: 'Switch light / dark mode', action: 'theme', target: '' },

  // External
  { id: 'github', icon: '</>', title: 'GitHub', description: 'View my code', action: 'external', target: 'https://github.com/Aumshah45' },
  { id: 'linkedin', icon: 'in', title: 'LinkedIn', description: 'Connect with me', action: 'external', target: 'https://www.linkedin.com/in/aum-shah-34a3871ba' },
];
