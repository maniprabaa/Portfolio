import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { resolveAsset } from '../../config/baseUrl.js';
import { TECHVOID_HEADLINE } from '../../lib/aboutContent.js';

const ease = [0.22, 1, 0.36, 1];

export default function AboutPhilosophy({ profile }) {
  return (
    <section className="relative mt-20 border-t border-line pt-20 md:mt-28 md:pt-28" aria-labelledby="about-philosophy">
      <div className="mx-auto max-w-page px-6 pb-8 md:px-10">
        <Reveal>
          <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">LOOKING FORWARD</p>
          <div className="mt-8 space-y-4 text-base leading-8 text-fg-2 md:text-lg">
            <p>I&apos;m building my skills.</p>
            <p>I&apos;m building products.</p>
            <p>I&apos;m building systems.</p>
            <p>
              And through <span className="text-fg">TechVoid</span>, I&apos;m building something
              bigger than myself.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            className="relative mt-16 overflow-hidden border border-line bg-void-2/60 px-6 py-16 text-center md:px-12 md:py-24"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,255,203,0.08),transparent_65%)]"
              aria-hidden="true"
            />
            <p className="relative font-orbit text-[10px] tracking-[0.45em] text-mint">
              TECHVOID PHILOSOPHY
            </p>
            <h2
              id="about-philosophy"
              className="relative mx-auto mt-6 max-w-4xl font-display text-2xl font-medium leading-tight tracking-[-0.02em] md:text-5xl"
            >
              {TECHVOID_HEADLINE}
            </h2>
            <p className="relative mx-auto mt-8 max-w-xl text-sm leading-relaxed text-fg-2 md:text-base">
              The idea is only the beginning. The real work starts when you decide to build it.
            </p>
          </motion.div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="inline-flex border border-mint/30 bg-mint/10 px-6 py-3 font-display text-[11px] tracking-[0.25em] text-mint transition hover:bg-mint/20"
            >
              VIEW MY WORK →
            </Link>
            <Link
              to="/contact"
              className="inline-flex border border-line px-6 py-3 font-display text-[11px] tracking-[0.25em] text-fg-2 transition hover:border-mint/30 hover:text-mint"
            >
              GET IN TOUCH →
            </Link>
            {profile?.resumeUrl && (
              <a
                href={resolveAsset(profile.resumeUrl)}
                download
                className="inline-flex border border-line px-6 py-3 font-display text-[11px] tracking-[0.25em] text-fg-2 transition hover:border-mint/30 hover:text-mint"
              >
                DOWNLOAD RESUME
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 grid gap-4 border border-line p-6 sm:grid-cols-3">
            {[
              [profile?.experience || '2 Years', 'EXPERIENCE'],
              [profile?.projectsCount || '20+', 'PROJECTS'],
              [profile?.freelance || 'Available', 'STATUS'],
            ].map(([value, label]) => (
              <div key={label} className="text-center sm:text-left">
                <p className="font-display text-2xl text-fg md:text-3xl">{value}</p>
                <p className="mt-1 font-orbit text-[9px] tracking-[0.35em] text-fg-3">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
