import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';
import { BUILD_CYCLE, MINDSET_LINES } from '../../lib/aboutContent.js';

const ease = [0.22, 1, 0.36, 1];

export default function AboutMindset() {
  return (
    <section className="relative mt-20 overflow-hidden border-t border-line pt-20 md:mt-28 md:pt-28" aria-labelledby="about-mindset">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(124,255,203,0.06),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-page px-6 md:px-10">
        <Reveal>
          <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">MINDSET</p>
          <h2 id="about-mindset" className="mt-4 max-w-4xl font-display text-3xl font-medium leading-tight md:text-5xl">
            I know I still have a lot to learn. That&apos;s what keeps me moving.
          </h2>
        </Reveal>

        <div className="mt-12 space-y-6">
          {MINDSET_LINES.map((line, index) => (
            <motion.p
              key={line}
              className="max-w-3xl text-lg leading-relaxed text-fg-2 md:text-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base leading-8 text-fg-2">
            I don&apos;t wait for perfection before starting. I build. I break things. I learn. I
            rebuild. And every project makes me better than the previous one.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-wrap gap-3 md:gap-4">
          {BUILD_CYCLE.map((word, index) => (
            <motion.span
              key={word}
              className="border border-line px-5 py-3 font-display text-xl tracking-[0.12em] text-fg md:px-8 md:py-4 md:text-3xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease }}
              whileHover={{ borderColor: 'rgba(124,255,203,0.4)', color: '#7cffcb' }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
