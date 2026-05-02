import { ScrollReveal } from '../effects/ScrollReveal';
import { ResultCard } from './ResultCard';

const results = [
  { value: '30+', label: 'Teams Served', context: 'Engineering squads' },
  { value: '80%', label: 'Faster Processing', context: '15 days \u2192 3-4 days' },
  { value: '85%', label: 'AI Accuracy', context: 'Document automation' },
  { value: "Q2 '25", label: 'Employee of Quarter', context: 'Sun Life Global' },
];

export function ResultsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
      {results.map((r, i) => (
        <ScrollReveal key={r.label} delay={0.1 * (i + 1)}>
          <ResultCard {...r} />
        </ScrollReveal>
      ))}
    </div>
  );
}
