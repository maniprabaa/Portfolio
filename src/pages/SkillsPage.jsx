import PageShell from '../components/layout/PageShell.jsx';
import PageHeader, { StandalonePageLinks } from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { resolveAsset } from '../config/baseUrl.js';
import { usePortfolio, PageLoader, PageError } from '../hooks/usePortfolio.jsx';
import { SKILL_CATEGORIES, groupSkillsByCategory } from '../lib/skills.js';

function SkillCard({ skill }) {
  const initials = skill.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="group flex h-full flex-col items-center border border-line p-8 text-center transition-all hover:border-mint/30 hover:bg-void-2/40">
      {skill.image ? (
        <img
          src={resolveAsset(skill.image)}
          alt={skill.name}
          className="mb-5 h-14 w-14 object-contain opacity-80 transition group-hover:opacity-100"
        />
      ) : (
        <div className="mb-5 flex h-14 w-14 items-center justify-center border border-line bg-surface font-display text-sm text-mint transition group-hover:border-mint/40">
          {initials}
        </div>
      )}
      <h3 className="font-display text-sm tracking-[0.15em] text-fg group-hover:text-mint">
        {skill.name}
      </h3>
    </div>
  );
}

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

  const grouped = groupSkillsByCategory(skills);

  return (
    <PageShell profile={profile}>
      <PageHeader
        eyebrow="/ 02 — CAPABILITIES"
        title="SKILLS &"
        outline="TECHNOLOGIES."
        description="Full-stack toolkit — frontend frameworks, Node.js backend, API integration, and MongoDB."
      />

      <div className="mx-auto mt-16 max-w-page px-6 md:px-10">
        {SKILL_CATEGORIES.map((category, catIndex) => {
          const items = grouped[category.id];
          if (!items?.length) return null;

          return (
            <section
              key={category.id}
              className={catIndex === 0 ? 'border-t border-line pt-16' : 'mt-16 border-t border-line pt-16'}
            >
              <Reveal>
                <p className="font-orbit text-[10px] tracking-[0.5em] text-mint">
                  / {String(catIndex + 1).padStart(2, '0')} — {category.label}
                </p>
                <h2 className="mt-4 font-display text-2xl font-medium tracking-[-0.02em] md:text-3xl">
                  {category.label}
                </h2>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((skill, i) => (
                  <Reveal key={skill._id} delay={(i % 4) * 0.08}>
                    <SkillCard skill={skill} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}

        <Reveal>
          <section className="mt-16 border-t border-line pt-16">
            <h2 className="font-display text-2xl font-medium">Full Stack Summary</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-2">
              {profile.codingLanguages}
            </p>
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
