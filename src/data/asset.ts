export interface AssetCase {
  label: string;
  value: string;
}

/** Why the pun holds: what makes the asset worth holding. */
export const assetPitch =
  'Every asset on a book has to justify its place. Mine: a full-stack and AI engineer at Sun Life who owns problems end to end and reports returns as numbers, not adjectives.';

export const assetCase: AssetCase[] = [
  {
    label: 'Compounds',
    value: 'Owns problems from schema to deploy. The Copilot platform shipped solo in six weeks.',
  },
  {
    label: 'Audited returns',
    value: '30+ squads on that platform. Claim reviews cut from 15 days to 3-4 with three agents.',
  },
  {
    label: 'Hedged',
    value: "AI only where it earns its place, and a well-designed form where it doesn't.",
  },
];
