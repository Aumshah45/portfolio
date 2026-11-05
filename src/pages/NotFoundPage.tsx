import { Link } from 'react-router-dom';
import { Shelf } from '../components/collection/Shelf';

export function NotFoundPage() {
  return (
    <section className="missing" aria-labelledby="missing-title">
      <div className="wrap">
        <p className="edition__no">No edition at this address</p>
        <h1 id="missing-title">This edition is out of print.</h1>
        <p className="missing__lede">A stale link, a typo, or something not yet released. Everything that is out is on the shelf below.</p>
        <div className="actions">
          <Link className="btn btn--ink" to="/#top">
            Back to the collection
          </Link>
        </div>
        <Shelf />
      </div>
    </section>
  );
}
