import PageShell from '../components/layout/PageShell.jsx';
import { StandalonePageLinks } from '../components/layout/PageHeader.jsx';
import AboutHero from '../components/about/AboutHero.jsx';
import AboutStory from '../components/about/AboutStory.jsx';
import AboutTechVoid from '../components/about/AboutTechVoid.jsx';
import AboutWorkEthic from '../components/about/AboutWorkEthic.jsx';
import AboutBuildJourney from '../components/about/AboutBuildJourney.jsx';
import AboutMindset from '../components/about/AboutMindset.jsx';
import AboutPhilosophy from '../components/about/AboutPhilosophy.jsx';
import { usePortfolio, PageLoader, PageError } from '../hooks/usePortfolio.jsx';

export default function AboutPage() {
  const { profile, loading, error } = usePortfolio();

  if (loading) {
    return (
      <PageShell>
        <PageLoader />
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <PageError message={error} />
      </PageShell>
    );
  }

  return (
    <PageShell profile={profile}>
      <AboutHero name={profile.name} />
      <AboutStory />
      <AboutTechVoid />
      <AboutWorkEthic />
      <AboutBuildJourney />
      <AboutMindset />
      <AboutPhilosophy profile={profile} />
      <StandalonePageLinks currentPath="/about" />
    </PageShell>
  );
}
