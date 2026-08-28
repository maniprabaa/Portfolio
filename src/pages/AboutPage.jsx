import PageShell from '../components/layout/PageShell.jsx';
import PageHeader, { StandalonePageLinks } from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { resolveAsset } from '../config/baseUrl.js';
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

  const details = [
    ['Name', profile.name],
    ['Age', profile.age],
    ['Email', profile.email],
    ['Freelance', profile.freelance],
    ['Role', profile.skillTitle],
    ['Experience', profile.experience],
    ['Languages', profile.languages],
  ];

  return (
    <PageShell profile={profile}>
      <PageHeader
        eyebrow="ABOUT"
        title="INSIDE"
        outline="THE VOID."
        description={profile.intro}
      />

      <div className="mx-auto mt-16 max-w-page px-6 md:px-10">
        <div className="grid gap-12 border-t border-line pt-16 md:grid-cols-2">
          <Reveal>
            {profile.profileImage && (
              <img
                src={resolveAsset(profile.profileImage)}
                alt={profile.name}
                className="w-full max-w-sm border border-line object-cover"
              />
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-medium tracking-[-0.02em]">Personal Info</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <div key={label} className="border border-line p-4">
                  <p className="font-orbit text-[9px] tracking-[0.35em] text-fg-3">{label.toUpperCase()}</p>
                  <p className="mt-2 text-sm text-fg">{value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <section className="mt-16 border-t border-line pt-16">
            <h2 className="font-display text-2xl font-medium tracking-[-0.02em]">Tech Stack</h2>
            <p className="mt-4 text-sm leading-relaxed text-fg-2 md:text-base">
              {profile.codingLanguages}
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section className="mt-16 border-t border-line pt-16">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-line p-8">
                <p className="font-display text-5xl font-medium">{profile.internshipMonths}</p>
                <p className="mt-2 font-orbit text-[9px] tracking-[0.35em] text-fg-3">MONTHS INTERNSHIP</p>
              </div>
              <div className="border border-line p-8">
                <p className="font-display text-5xl font-medium">{profile.projectsCount}</p>
                <p className="mt-2 font-orbit text-[9px] tracking-[0.35em] text-fg-3">PROJECTS COMPLETED</p>
              </div>
            </div>
            {profile.resumeUrl && (
              <a
                href={resolveAsset(profile.resumeUrl)}
                download
                className="mt-8 inline-flex bg-fg px-7 py-4 font-display text-[12px] tracking-[0.25em] text-void transition hover:bg-mint"
              >
                DOWNLOAD RESUME
              </a>
            )}
          </section>
        </Reveal>
      </div>

      <StandalonePageLinks currentPath="/about" />
    </PageShell>
  );
}
