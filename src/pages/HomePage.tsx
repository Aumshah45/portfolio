import { Hero } from '../components/hero/Hero';
import { ServicesSection } from '../components/services/ServicesSection';
import { ProcessSection } from '../components/process/ProcessSection';
import { HonestQA } from '../components/qa/HonestQA';
import { ProjectsSection } from '../components/projects/ProjectsSection';
import { AboutSection } from '../components/about/AboutSection';
import { SkillsSection } from '../components/skills/SkillsSection';
import { RecognitionSection } from '../components/recognition/RecognitionSection';
import { CredentialsSection } from '../components/credentials/CredentialsSection';
import { CTASection } from '../components/cta/CTASection';

export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <HonestQA />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <RecognitionSection />
      <CredentialsSection />
      <CTASection />
    </>
  );
}
