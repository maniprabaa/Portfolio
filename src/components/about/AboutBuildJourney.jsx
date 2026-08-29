import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';
import { BUILD_JOURNEY } from '../../lib/aboutContent.js';

const ease = [0.22, 1, 0.36, 1];

export default function AboutBuildJourney() {
  return (
    <section className="mt-20 border-t border-line pt-20 md:mt-28 md:pt-28" aria-labelledby="about-build">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <Reveal>
          <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">WHAT I BUILD</p>
          <h2 id="about-build" className="mt-4 font-display text-3xl font-medium md:text-4xl">
            The full product lifecycle — not just one layer.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-2 md:text-base">
            I enjoy the challenge of taking something from &ldquo;We should build this&rdquo; to
            &ldquo;It&apos;s live.&rdquo;
          </p>
        </Reveal>

        <div className="relative mt-14">
          <div
            className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-mint/40 via-line to-violet/30 md:left-1/2 md:block md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-6 md:space-y-0">
            {BUILD_JOURNEY.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.step}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                    index > 0 ? 'md:mt-10' : ''
                  }`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease }}
                >
                  <div className={`${isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                    <article className="group border border-line bg-surface/40 p-6 transition hover:border-mint/25 hover:bg-void-2/60">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-orbit text-[10px] tracking-[0.35em] text-mint">
                          {item.step}
                        </span>
                        <span className="hidden h-px flex-1 bg-line md:block" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 font-display text-lg tracking-[0.08em] text-fg group-hover:text-mint">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-fg-2">{item.body}</p>
                    </article>
                  </div>

                  <div
                    className={`pointer-events-none absolute left-4 top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-mint bg-void md:left-1/2 md:block ${
                      isLeft ? '' : ''
                    }`}
                    aria-hidden="true"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
