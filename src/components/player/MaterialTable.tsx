import type { ReactNode } from 'react';
import { credentials } from '../../data/credentials';

const certDetail: Record<string, string> = {
  'AWS Cloud Operations': 'EC2, S3, Lambda, Step Functions, IAM',
  'Machine Learning': "Andrew Ng's specialization",
};

const dates = (s?: string) => s?.replace(/\s*—\s*/g, ' to ');
const sub = (s: string) => s.replace(/\s*—\s*/g, ' · ');

const experience = credentials.find((c) => c.category === 'Experience')?.items ?? [];
const [degree, ...certs] = credentials.find((c) => c.category !== 'Experience')?.items ?? [];

const rows: { label: string; value: ReactNode }[] = [
  ...(degree
    ? [
        {
          label: 'Opening',
          value: (
            <>
              <b>{degree.title}</b> · {sub(degree.subtitle)} · {dates(degree.date)}
            </>
          ),
        },
      ]
    : []),
  ...experience.map((item, i) => ({
    label: i === 0 ? 'Current' : 'Development',
    value: (
      <>
        <b>{item.title}</b> · {item.subtitle} · {dates(item.date)}
      </>
    ),
  })),
  {
    label: 'Published',
    value: (
      <>
        <b>1 paper</b> · IEEE 15th ICCCNT, IoT botnet detection
      </>
    ),
  },
  ...certs.map((item) => ({
    label: 'Rating',
    value: (
      <>
        <b>{item.title}</b> · {item.subtitle}
        {certDetail[item.title] && <span className="block text-[12px] text-acc-dim">{certDetail[item.title]}</span>}
      </>
    ),
  })),
  {
    label: 'Mentoring',
    value: (
      <>
        <b>4 engineers mentored</b> on the job
      </>
    ),
  },
];

/** Credentials, read as the material on the board. */
export function MaterialTable() {
  return (
    <div className="mt-[30px] overflow-hidden rounded-panel border border-line-2">
      <table className="w-full border-collapse text-[13px]">
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.label}-${i}`} className={i > 0 ? 'border-t border-line-2' : ''}>
              <th
                scope="row"
                className="w-[130px] px-4 py-[11px] text-left align-top font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-acc-dim max-[520px]:w-[100px] max-[520px]:px-3"
              >
                {row.label}
              </th>
              <td className="px-4 py-[11px] text-text-2 max-[520px]:px-3 [&_b]:font-semibold [&_b]:text-title">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
