import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { resolveAsset } from '../config/baseUrl.js';
import { usePortfolio, PageLoader, PageError } from '../hooks/usePortfolio.jsx';

const ease = [0.22, 1, 0.36, 1];

const quickLinks = [
  { label: 'About Me', path: '/about', index: '01' },
  { label: 'Skills', path: '/skills', index: '02' },
  { label: 'My Work', path: '/projects', index: '03' },
  { label: 'Contact', path: '/contact', index: '04' },
];

export default function HomePage() {
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

  const lines = ['I BUILD', 'DIGITAL', 'EXPERIENCES.'];

  return (
    <PageShell profile={profile} hero>
      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden" aria-label="Hero">
        <div className="void-grid absolute inset-0" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_75%_45%,rgba(124,255,203,0.06),transparent_65%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#141414] via-[#0c0c0c]/90 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mint/[0.07] to-transparent"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute right-[5%] top-[42%] hidden -translate-y-1/2 opacity-30 lg:block">
          <div className="css-void-core h-64 w-64 xl:h-80 xl:w-80" />
        </div>

        <div className="relative z-10 mx-auto max-w-page px-6 md:px-10">
          <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            {/* Left — headline & CTAs */}
            <div className="order-2 lg:order-1">
              <motion.p
                className="mb-4 font-orbit text-[10px] tracking-[0.5em] text-mint"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
              >
                {profile.subtitle?.toUpperCase() || 'FULL STACK / REACT / NODE'}
              </motion.p>

              <h1 className="font-display font-medium leading-[0.92] tracking-[-0.03em]">
                {lines.map((line, i) => (
                  <span key={line} className="block overflow-hidden">
                    <motion.span
                      className={`block text-4xl sm:text-5xl md:text-6xl xl:text-7xl ${
                        i === 2 ? 'text-outline' : ''
                      }`}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.12, ease }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="mt-6 max-w-lg text-sm leading-relaxed text-fg-2 md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
              >
                {profile.intro}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease }}
              >
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-3 bg-fg px-6 py-3.5 font-display text-[11px] font-medium tracking-[0.25em] text-void transition-all duration-300 hover:bg-mint md:text-[12px]"
                >
                  VIEW MY WORK
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                {profile.resumeUrl && (
                  <a
                    href={resolveAsset(profile.resumeUrl)}
                    download
                    className="inline-flex items-center gap-3 border border-line px-6 py-3.5 font-display text-[11px] tracking-[0.25em] text-fg transition-all hover:border-white/30 hover:bg-white/5 md:text-[12px]"
                  >
                    DOWNLOAD CV
                  </a>
                )}
              </motion.div>
            </div>

            {/* Right — photo + profile */}
            <motion.div
              className="order-1 lg:order-2 lg:flex lg:min-h-[calc(100svh-6rem)] lg:items-center lg:justify-end"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease }}
            >
              <div className="w-full max-w-lg lg:max-w-none">
                {profile.profileImage && (
                  <div className="relative mx-auto w-fit lg:mx-0 lg:ml-auto">
                    <div className="absolute -inset-5 rounded-full bg-mint/15 blur-2xl" />
                    <img
                      src={resolveAsset(profile.profileImage)}
                      alt={profile.name}
                      className="relative h-52 w-52 rounded-full border border-line object-cover glow-ring sm:h-60 sm:w-60 lg:h-72 lg:w-72 xl:h-80 xl:w-80"
                    />
                  </div>
                )}

                <div className="mt-8 text-center lg:mt-10 lg:text-right">
                  <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">PROFILE</p>
                  <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em] md:text-4xl xl:text-5xl">
                    {profile.name}
                  </h2>
                  <p className="mt-2 text-lg text-mint md:text-xl">{profile.tagline}</p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="border border-line px-5 py-5 lg:px-6 lg:py-6">
                      <p className="font-display text-3xl text-fg md:text-4xl">{profile.experience}</p>
                      <p className="mt-1 font-orbit text-[9px] tracking-[0.3em] text-fg-3">EXPERIENCE</p>
                    </div>
                    <div className="border border-line px-5 py-5 lg:px-6 lg:py-6">
                      <p className="font-display text-3xl text-fg md:text-4xl">{profile.projectsCount}</p>
                      <p className="mt-1 font-orbit text-[9px] tracking-[0.3em] text-fg-3">PROJECTS</p>
                    </div>
                  </div>

                  <Link
                    to="/about"
                    className="mt-8 inline-flex items-center gap-2 font-display text-[12px] tracking-[0.25em] text-mint transition hover:gap-3"
                  >
                    LEARN MORE →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          aria-hidden="true"
        >
          <span className="font-orbit text-[9px] tracking-[0.4em] text-fg-3">SCROLL</span>
          <span className="h-8 w-px overflow-hidden bg-line">
            <span
              className="block h-3 w-full bg-mint"
              style={{ animation: 'scroll-dot 2s ease-in-out infinite' }}
            />
          </span>
        </motion.div>
      </section>

      <section className="relative border-t border-line bg-gradient-to-b from-[#121212] to-void py-32 md:py-48">
        <div className="mx-auto max-w-page px-6 md:px-10">
          <Reveal>
            <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">/ 01 — EXPLORE</p>
            <h2 className="mt-8 font-display text-4xl font-medium tracking-[-0.03em] md:text-6xl">
              NAVIGATE THE VOID
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {quickLinks.map((item, i) => (
              <Reveal key={item.path} delay={i * 0.1}>
                <Link
                  to={item.path}
                  className="group flex items-center justify-between border border-line p-8 transition-all hover:border-mint/30 hover:bg-void-2/40"
                >
                  <div>
                    <span className="font-orbit text-xs text-mint">{item.index}</span>
                    <h3 className="mt-2 font-display text-2xl font-medium text-fg transition-colors group-hover:text-mint">
                      {item.label.toUpperCase()}
                    </h3>
                  </div>
                  <span className="text-2xl text-fg-3 transition-all group-hover:translate-x-1 group-hover:text-mint">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
