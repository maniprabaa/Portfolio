import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { PAGE_LINKS } from '../../lib/site.js';

export default function PageHeader({ eyebrow, title, outline, description }) {
  return (
    <article className="mx-auto max-w-page px-6 md:px-10">
      <Reveal>
        <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">{eyebrow}</p>
        <h1 className="mt-6 font-display text-4xl font-medium tracking-[-0.03em] md:text-6xl">
          {title}
          {outline && (
            <>
              <br />
              <span className="text-outline">{outline}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg-2 md:text-base">
            {description}
          </p>
        )}
      </Reveal>
    </article>
  );
}

export function StandalonePageLinks({ currentPath }) {
  const others = PAGE_LINKS.filter((p) => p.path !== currentPath);

  return (
    <nav
      className="mx-auto mt-20 flex max-w-page flex-wrap gap-4 border-t border-line px-6 pt-10 md:px-10"
      aria-label="More pages"
    >
      {others.map((page) => (
        <Link
          key={page.path}
          to={page.path}
          className="border border-line px-5 py-3 font-display text-[11px] tracking-[0.25em] text-fg-2 transition-all hover:border-mint/40 hover:text-mint"
        >
          {page.name.toUpperCase()} →
        </Link>
      ))}
    </nav>
  );
}
