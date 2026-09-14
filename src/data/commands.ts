import type { Command } from '../types';

export const commands: Command[] = [
  // Scenes, in playhead order
  { id: 'top', icon: '01', title: 'SC01 · Market open', description: 'Back to the top', action: 'scroll', target: 'top' },
  { id: 'work', icon: '02', title: 'SC02 · Holdings', description: 'Case studies: Copilot, claims agents, Numera', action: 'scroll', target: 'work' },
  { id: 'honest', icon: '03', title: 'SC03 · Intermission', description: 'Five questions, answered straight', action: 'scroll', target: 'honest' },
  { id: 'about', icon: '04', title: 'SC04 · The player', description: 'Letter, credentials, career scoresheet', action: 'scroll', target: 'about' },
  { id: 'recognition', icon: '05', title: 'SC05 · The reel', description: 'Awards & recognitions', action: 'scroll', target: 'recognition' },
  { id: 'contact', icon: '06', title: 'SC06 · Credits', description: 'The stack, and how to get in touch', action: 'scroll', target: 'contact' },

  // Actions
  { id: 'resume', icon: '↓', title: 'Download prospectus', description: 'Résumé PDF, latest version', action: 'download', target: '/Aum_Shah_Resume.pdf' },
  { id: 'theme', icon: '◐', title: 'Switch showing', description: 'Late show (dark) / Matinée (light)', action: 'theme', target: '' },

  // External
  { id: 'github', icon: '</>', title: 'GitHub', description: 'View my code', action: 'external', target: 'https://github.com/Aumshah45' },
  { id: 'linkedin', icon: 'in', title: 'LinkedIn', description: 'Connect with me', action: 'external', target: 'https://www.linkedin.com/in/aum-shah-34a3871ba' },
];
