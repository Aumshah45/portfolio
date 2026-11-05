import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Stage } from '../components/collection/Stage';
import { Glance } from '../components/home/Glance';
import { Press } from '../components/home/Press';
import { LinerNotes } from '../components/home/LinerNotes';
import { RiskFactors } from '../components/home/RiskFactors';
import { Commentary } from '../components/home/Commentary';
import { Close } from '../components/home/Close';

export function HomePage() {
  const { hash, key } = useLocation();
  const [selected, setSelected] = useState(0);

  // Section links arrive as /#id, including from edition pages.
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => window.clearTimeout(timer);
  }, [hash, key]);

  return (
    <>
      <Stage selected={selected} onSelect={setSelected} />
      <Glance />
      <Press />
      <LinerNotes />
      <RiskFactors />
      <Commentary />
      <Close />
    </>
  );
}
