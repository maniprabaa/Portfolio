import PageShell from '../components/layout/PageShell.jsx';
import PageHeader, { StandalonePageLinks } from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { resolveAsset } from '../config/baseUrl.js';
import { usePortfolio, PageLoader, PageError } from '../hooks/usePortfolio.jsx';

export default function SkillsPage() {
  const { profile, skills, loading, error } = usePortfolio();

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
      <PageHeader
        eyebrow="/ 02 — CAPABILITIES"
        title="SKILLS &"
        outline="TECHNOLOGIES."
        description="Tools and technologies I use to build modern, scalable applications."
      />

      <div className="mx-auto mt-16 max-w-page px-6 md:px-10">
        <div className="grid gap-4 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <Reveal key={skill._id} delay={(i % 4) * 0.08}>
              <div className="group flex h-full flex-col items-center border border-line p-8 text-center transition-all hover:border-mint/30 hover:bg-void-2/40">
                {skill.image && (
                  <img
                    src={resolveAsset(skill.image)}
                    alt={skill.name}
                    className="mb-5 h-14 w-14 object-contain opacity-80 transition group-hover:opacity-100"
                  />
                )}
                <h3 className="font-display text-sm tracking-[0.2em] text-fg group-hover:text-mint">
                  {skill.name}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section className="mt-16 border-t border-line pt-16">
            <h2 className="font-display text-2xl font-medium">All Technologies</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill._id}
                  className="border border-line px-3 py-1.5 text-[11px] tracking-wide text-fg-2"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        </Reveal>
      </div>

      <StandalonePageLinks currentPath="/skills" />
    </PageShell>
  );
}
