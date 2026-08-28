import { Link } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';
import TechVoidBrand from '../ui/TechVoidBrand.jsx';
import { NAV_LINKS, TECH_VOID_URL } from '../../lib/site.js';

export default function Footer({ profile }) {
  const name = profile?.name || 'Portfolio';
  const email = profile?.email || '';

  return (
    <footer className="relative border-t border-line" aria-label="Footer">
      <div className="mx-auto max-w-page px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo profile={profile} />
            <p className="mt-4 font-orbit text-lg font-bold tracking-[0.35em]">
              {name.toUpperCase()}
            </p>
            <p className="mt-4 max-w-60 text-xs leading-relaxed text-fg-3">
              {profile?.tagline || 'Full-Stack Developer crafting digital experiences.'}
            </p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-3 inline-block font-display text-[12px] tracking-[0.15em] text-fg-2 transition-colors hover:text-mint"
              >
                {email}
              </a>
            )}
          </div>

          <nav className="flex flex-col gap-3" aria-label="Pages">
            <p className="font-orbit text-[9px] tracking-[0.4em] text-fg-3">PAGES</p>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="font-display text-[12px] tracking-[0.25em] text-fg-2 transition-colors hover:text-mint"
              >
                {l.name.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div>
            <p className="font-orbit text-[9px] tracking-[0.4em] text-fg-3">COMPANY</p>
            <div className="mt-4">
              <TechVoidBrand />
            </div>
            <p className="mt-4 max-w-52 text-xs leading-relaxed text-fg-3">
              Technology that turns ideas into experiences.
            </p>
            <a
              href={TECH_VOID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-display text-[12px] tracking-[0.15em] text-fg-2 transition-colors hover:text-mint"
            >
              VISIT TECH VOID →
            </a>
          </div>

          <div>
            <p className="font-orbit text-[9px] tracking-[0.4em] text-fg-3">STATUS</p>
            <p className="mt-4 font-display text-[12px] tracking-[0.2em] text-mint">
              {profile?.freelance?.toUpperCase() || 'AVAILABLE'}
            </p>
            <p className="mt-2 text-sm text-fg-2">{profile?.experience}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-orbit text-[9px] tracking-[0.35em] text-fg-3">
            © {new Date().getFullYear()} {name.toUpperCase()}
          </p>
          <p className="font-orbit text-[9px] tracking-[0.35em] text-fg-3">
            BUILT FROM THE VOID.
          </p>
        </div>
      </div>
    </footer>
  );
}
