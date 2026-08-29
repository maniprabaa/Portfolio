import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';
import TechVoidBrand from '../ui/TechVoidBrand.jsx';
import { TECH_VOID_URL } from '../../lib/site.js';
import { VOID_TRIGGERS } from '../../lib/aboutContent.js';

const ease = [0.22, 1, 0.36, 1];

export default function AboutTechVoid() {
  return (
    <section className="relative mt-20 overflow-hidden border-t border-line pt-20 md:mt-28 md:pt-28" aria-labelledby="about-techvoid">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.08),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-page px-6 md:px-10">
        <Reveal>
          <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">WHY TECHVOID</p>
          <h2 id="about-techvoid" className="mt-4 max-w-3xl font-display text-3xl font-medium md:text-5xl">
            Ideas should not stay ideas just because they are difficult to build.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal delay={0.05}>
            <div className="flex items-center gap-4">
              <TechVoidBrand showWordmark />
            </div>
            <p className="mt-8 text-base leading-8 text-fg-2 md:text-lg">
              TechVoid was born from a simple belief: technology, creativity, and problem-solving
              should come together in one place — where a concept moves beyond a conversation and
              becomes a real, working product.
            </p>
            <p className="mt-6 text-base leading-8 text-fg-2">
              TechVoid represents the part of technology many people don&apos;t see — the empty
              space before something is created.
            </p>
            <a
              href={TECH_VOID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex border border-line px-5 py-3 font-display text-[11px] tracking-[0.25em] text-fg-2 transition hover:border-mint/40 hover:text-mint"
            >
              VISIT TECH VOID →
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative border border-line bg-surface/50 p-8">
              <div className="absolute -left-px top-8 h-24 w-px bg-mint/50" aria-hidden="true" />
              <p className="font-orbit text-[9px] tracking-[0.35em] text-fg-3">WHERE IT STARTS</p>
              <ul className="mt-6 space-y-4">
                {VOID_TRIGGERS.map((line, index) => (
                  <motion.li
                    key={line}
                    className="flex items-center gap-4 font-display text-lg text-fg md:text-xl"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease }}
                  >
                    <span className="font-orbit text-[10px] text-mint">0{index + 1}</span>
                    {line}
                  </motion.li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-6 text-base leading-8 text-fg-2">
                I don&apos;t see the void as emptiness. I see it as{' '}
                <span className="text-mint">possibility</span>.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-2">
            {['Curiosity', 'Building from scratch', 'Problem solving', 'Ambition', 'Experimentation', 'Growth'].map((tag) => (
              <span
                key={tag}
                className="border border-line px-3 py-1.5 text-[10px] tracking-[0.15em] text-fg-3"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
