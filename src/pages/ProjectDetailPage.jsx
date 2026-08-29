import { Link, useNavigate, useParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Seo from '../components/Seo.jsx';
import { resolveAsset } from '../config/baseUrl.js';
import { normalizeContentBlocks } from '../lib/projectContent.js';
import { usePortfolio, PageLoader, PageError } from '../hooks/usePortfolio.jsx';
import { getSiteUrl } from '../lib/seo.js';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ProjectContent({ project }) {
  const blocks = normalizeContentBlocks(project);

  return (
    <div className="prose-blog mt-10 space-y-6">
      {blocks.map((block, index) => {
        if (block.type === 'text') {
          return (
            <p
              key={`text-${index}`}
              className="text-base leading-8 text-fg-2 md:text-lg"
            >
              {block.value}
            </p>
          );
        }

        if (block.type === 'image' && block.url) {
          return (
            <figure key={`image-${index}`} className="my-8 overflow-hidden border border-line bg-void-2">
              <img
                src={resolveAsset(block.url)}
                alt={block.alt || project.title}
                className="w-full object-contain p-2 md:p-4"
              />
              {block.caption && (
                <figcaption className="border-t border-line px-4 py-3 text-center text-sm text-fg-3">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const project = projects.find((item) => item._id === id);

  if (!project) {
    return (
      <PageShell profile={profile}>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center md:px-10">
          <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">NOT FOUND</p>
          <p className="mt-4 text-sm text-fg-2">This project could not be found.</p>
          <Link to="/projects" className="mt-8 inline-block text-sm text-mint hover:underline">
            ← Back to projects
          </Link>
        </div>
      </PageShell>
    );
  }

  const tags = project.languages?.split(',').map((tag) => tag.trim()).filter(Boolean) ?? [];
  const highlights = Array.isArray(project.highlights) ? project.highlights : [];

  return (
    <PageShell profile={profile}>
      <Seo
        title={`${project.title} | Prabakaran`}
        description={project.description || `Case study for ${project.title} by Prabakaran.`}
        image={
          project.image?.startsWith('http')
            ? project.image
            : project.image
              ? `${getSiteUrl()}${project.image}`
              : undefined
        }
      />
      <article className="mx-auto max-w-4xl px-6 pb-20 md:px-10">
        <Reveal>
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="mb-10 text-[11px] tracking-[0.25em] text-fg-3 transition hover:text-mint"
          >
            ← BACK TO PROJECTS
          </button>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="overflow-hidden border border-line bg-void-2">
            {project.image ? (
              <img
                src={resolveAsset(project.image)}
                alt={project.title}
                className="aspect-[16/10] w-full bg-void-2 object-contain p-4"
              />
            ) : (
              <div className="aspect-[16/10] w-full bg-void-2" />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <header className="mt-10 border-b border-line pb-10">
            <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">PROJECT CASE STUDY</p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-fg md:text-5xl">
              {project.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] tracking-wide text-fg-3">
              {project.updatedAt && <span>{formatDate(project.updatedAt)}</span>}
              {tags.length > 0 && <span>{tags.join(' · ')}</span>}
            </div>
            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-line px-3 py-1 text-[10px] tracking-wider text-fg-3"
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </header>
        </Reveal>

        <Reveal delay={0.15}>
          <ProjectContent project={project} />
        </Reveal>

        {highlights.length > 0 && (
          <Reveal delay={0.2}>
            <section className="mt-12 border border-line bg-void-2/40 p-8">
              <h2 className="font-display text-sm tracking-[0.2em] text-mint">KEY FEATURES</h2>
              <ul className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {project.liveUrl && (
          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-mint/40 bg-mint/10 px-6 py-3 text-[11px] tracking-[0.25em] text-mint transition hover:bg-mint/20"
              >
                VIEW LIVE PROJECT →
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 border border-line px-6 py-3 text-[11px] tracking-[0.25em] text-fg-3 transition hover:border-mint/30 hover:text-mint"
              >
                MORE PROJECTS
              </Link>
            </div>
          </Reveal>
        )}
      </article>
    </PageShell>
  );
}
