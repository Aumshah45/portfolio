/**
 * The colophon: what the work is built with. Drawn from the résumé's Technical
 * Skills and the tools named in the editions; nothing here is aspirational.
 */
export const career: { title: string; org: string; dates: string; note?: string }[] = [
  { title: 'Associate Analyst Development', org: 'Sun Life Global Solutions', dates: 'Aug 2025 to present', note: 'Promoted after a year as a trainee' },
  { title: 'Graduate Engineer Trainee', org: 'Sun Life Global Solutions', dates: 'Aug 2024 to Aug 2025', note: 'Employee of the Quarter, Q2 2025' },
];

export const toolkit: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL (PostgreSQL)', 'C++', 'HTML/CSS'] },
  { group: 'AI and agents', items: ['Amazon Bedrock', 'LangChain', 'MCP', 'Function calling', 'Structured outputs', 'LLM evaluation'] },
  { group: 'Backend and frontend', items: ['FastAPI', 'Flask', 'REST APIs', 'SQLAlchemy', 'Pydantic', 'React', 'Next.js', 'Material-UI', 'Tailwind CSS', 'Storybook'] },
  { group: 'Cloud and delivery', items: ['AWS Lambda', 'Step Functions', 'SQS', 'S3', 'CloudWatch', 'Docker', 'Jenkins', 'GitHub Actions'] },
  { group: 'Data and testing', items: ['Pandas', 'NumPy', 'Neural networks (CNN, LSTM)', 'Pytest', 'Contract testing'] },
];
