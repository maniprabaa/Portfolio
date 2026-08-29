import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import { CORE_MANTRA } from '../../lib/aboutContent.js';

const ease = [0.22, 1, 0.36, 1];

export default function AboutHero({ name }) {
  const displayName = name || 'Prabakaran';

  return (
    <section className="relative overflow-hidden" aria-label="About hero">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,rgba(124,255,203,0.07),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-page px-6 md:px-10">
        <Reveal>
          <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">/ 01 — ABOUT</p>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="font-display text-4xl font-medium leading-[0.95] tracking-[-0.03em] md:text-6xl xl:text-7xl">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
              >
                MORE THAN
              </motion.span>
              <motion.span
                className="mt-1 block text-outline"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
              >
                JUST CODE.
              </motion.span>
            </h1>

            <Reveal delay={0.15}>
              <p className="mt-8 max-w-2xl text-base leading-8 text-fg-2 md:text-lg">
                I&apos;m <span className="text-fg">{displayName}</span>, a developer who believes
                building technology is not just about writing code that works — it&apos;s about
                solving real problems, taking ownership, and turning an idea into something people
                can actually use.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="border border-line bg-surface/40 p-8 backdrop-blur-sm">
              <p className="font-orbit text-[9px] tracking-[0.4em] text-mint">CORE MINDSET</p>
              <p className="mt-4 font-display text-xl leading-snug text-fg md:text-2xl">
                {CORE_MANTRA}
              </p>
              <div className="mt-6 flex items-center gap-3 text-fg-3">
                <ArrowDown className="h-4 w-4 animate-bounce" />
                <span className="text-[11px] tracking-[0.2em]">SCROLL THE STORY</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
