import type { CSSProperties, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { editions } from '../../data/editions';
import type { Edition } from '../../data/editions';

interface Props {
  /** Index of the pulled edition; with onSelect the spines are buttons, without it they link to each edition. */
  selected?: number;
  onSelect?: (i: number) => void;
  /** Leave this edition off the shelf (it is the one on screen). */
  exclude?: string;
  label?: string;
  hint?: string;
}

const spineStyle = (e: Edition, i: number) => ({ '--w': `${e.w}px`, '--h': `${e.h}px`, '--i': i }) as CSSProperties;

function SpineFace({ e }: { e: Edition }) {
  return (
    <>
      <span className="spine__no">{e.no}</span>
      <span className="spine__title">{e.spine}</span>
      <span className="spine__mark" />
    </>
  );
}

/** The shelf of spines: the collection at a glance, and the way to pull an edition. */
export function Shelf({ selected, onSelect, exclude, label, hint }: Props) {
  const items = editions.map((e, i) => ({ e, i })).filter(({ e }) => !exclude || e.slug !== exclude);

  const onKey = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (!onSelect || selected === undefined) return;
    if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
    ev.preventDefault();
    const next = (selected + (ev.key === 'ArrowRight' ? 1 : -1) + editions.length) % editions.length;
    onSelect(next);
    ev.currentTarget.querySelectorAll<HTMLElement>('.spine')[next]?.focus();
  };

  return (
    <div className="shelf" role="group" aria-label="The collection, six editions" onKeyDown={onKey}>
      {label && <p className="shelf__label">{label}</p>}
      {hint && <p className="shelf__hint">{hint}</p>}
      {items.map(({ e, i }) =>
        onSelect ? (
          <button
            key={e.no}
            type="button"
            className={`spine spine--${e.variant}`}
            style={spineStyle(e, i)}
            aria-pressed={selected === i}
            aria-label={`No. ${e.no}, ${e.title}`}
            onClick={() => onSelect(i)}
          >
            <SpineFace e={e} />
          </button>
        ) : e.slug ? (
          <Link key={e.no} to={`/projects/${e.slug}`} className={`spine spine--${e.variant}`} style={spineStyle(e, i)} aria-label={`No. ${e.no}, ${e.title}`}>
            <SpineFace e={e} />
          </Link>
        ) : (
          <span key={e.no} className={`spine spine--${e.variant} spine--sealed`} style={spineStyle(e, i)} aria-label={`No. ${e.no}, ${e.title}, private`}>
            <SpineFace e={e} />
          </span>
        ),
      )}
    </div>
  );
}
