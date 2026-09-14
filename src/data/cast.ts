import { skills } from './skills';

const personas: Record<string, string> = {
  Python: 'the workhorse',
  TypeScript: 'the stickler',
  JavaScript: 'the old hand',
  SQL: 'the archivist',
  'C++': 'the first teacher',
  'HTML/CSS': 'the set dresser',
  React: 'the face',
  FastAPI: 'the fast talker',
  Flask: 'the reliable lead',
  'Material-UI': 'wardrobe',
  Storybook: 'the continuity editor',
  'REST APIs': 'the dialogue',
  AWS: 'the location',
  LangChain: 'the ensemble',
  PostgreSQL: 'the memory',
  Jenkins: 'the stage manager',
  Pandas: 'the accountant',
  NumPy: 'the math double',
};

export interface CastGroup {
  department: string;
  members: { name: string; role: string }[];
}

export const cast: CastGroup[] = skills.map((group) => ({
  department: group.category,
  members: group.items.map((name) => ({ name, role: personas[name] ?? '' })),
}));

export const specialAppearance = { name: 'MCP', role: 'the new voice' };
