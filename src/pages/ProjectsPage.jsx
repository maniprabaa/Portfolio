import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell.jsx';
import PageHeader, { StandalonePageLinks } from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { resolveAsset } from '../config/baseUrl.js';
import { usePortfolio, PageLoader, PageError } from '../hooks/usePortfolio.jsx';

const accents = ['#7CFFCB', '#8B5CF6', '#F5F5F5', '#7CFFCB', '#8B5CF6', '#F5F5F5'];

function ProjectVisual({ accent, index }) {
  const type = index % 3;
  if (type === 0) {
    return (
      <div className="relative h-full w-full" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 animate-orbit-slow rounded-full border border-dashed opacity-30"
          style={{ borderColor: accent }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ring-1"
          style={{ borderColor: accent, boxShadow: `0 0 30px ${accent}22` }}
        />
      </div>
    );
  }
  if (type === 1) {
    return (
      <div className="relative grid h-full w-full grid-cols-4 grid-rows-3 gap-2 p-8" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`border border-white/8 bg-white/2 ${i === 5 ? 'bg-white/8' : ''}`} />
        ))}
      </div>
    );
  }
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-1.5 px-10" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="w-1 rounded-full"
          style={{
            height: `${18 + Math.abs(Math.sin(i * 0.8)) * 50}%`,
            background: accent,
            opacity: 0.15 + Math.abs(Math.sin(i * 0.8)) * 0.25,
          }}
        />
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const { profile, projects, loading, error } = usePortfolio();

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
        eyebrow="/ 03 — WORK"
        title="SELECTED"
        outline="PROJECTS."
        description="A collection of projects showcasing my skills in web development and design."
      />

      <div className="mx-auto mt-16 max-w-page px-6 md:px-10">
        <div className="grid gap-6 border-t border-line pt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const accent = accents[i % accents.length];
            return (
              <Reveal key={project._id} delay={(i % 3) * 0.1}>
                <Link
                  to={`/projects/${project._id}`}
                  className="group flex h-full flex-col border border-line transition-all hover:border-mint/30 hover:bg-void-2/40"
                >
                  <div className="relative h-36 overflow-hidden border-b border-line bg-void-2 md:h-40">
                    {project.image ? (
                      <img
                        src={resolveAsset(project.image)}
                        alt={project.title}
                        className="h-full w-full object-contain p-1.5 transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <ProjectVisual accent={accent} index={i} />
                    )}
                  </div>
                  <div className="flex flex-col p-4">
                    <h3 className="font-display text-base font-medium text-fg transition-colors group-hover:text-mint">
                      {project.title.toUpperCase()}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-fg-2">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.languages?.split(',').slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="border border-line px-2 py-0.5 text-[9px] tracking-wider text-fg-3"
                        >
                          {tag.trim().toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <span className="mt-3 text-[10px] tracking-[0.2em] text-mint opacity-80 transition group-hover:opacity-100">
                      READ CASE STUDY →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>

      <StandalonePageLinks currentPath="/projects" />
    </PageShell>
  );
}
