import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/hero/Hero';
import { HoldingsSection } from '../components/holdings/HoldingsSection';
import { IntermissionSection } from '../components/intermission/IntermissionSection';
import { PlayerSection } from '../components/player/PlayerSection';
import { ReelSection } from '../components/reel/ReelSection';
import { CreditsSection } from '../components/credits/CreditsSection';

export function HomePage() {
  const { hash, key } = useLocation();

  // Scene links arrive as /#id, including from case-study pages.
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => window.clearTimeout(timer);
  }, [hash, key]);

  return (
    <>
      <Hero />
      <HoldingsSection />
      <IntermissionSection />
      <PlayerSection />
      <ReelSection />
      <CreditsSection />
    </>
  );
}
