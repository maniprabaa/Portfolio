import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';
import { WORK_ETHIC } from '../../lib/aboutContent.js';

const ease = [0.22, 1, 0.36, 1];

export default function AboutWorkEthic() {
  return (
    <section className="mt-20 border-t border-line pt-20 md:mt-28 md:pt-28" aria-labelledby="about-work-ethic">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <Reveal>
          <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">WORK ETHIC</p>
          <h2 id="about-work-ethic" className="mt-4 font-display text-3xl font-medium md:text-4xl">
            How I show up when the work gets hard.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {WORK_ETHIC.map((item, index) => (
            <motion.article
              key={item.id}
              className="group relative overflow-hidden border border-line bg-void-2/40 p-6 transition-colors hover:border-mint/30 hover:bg-void-2/70"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.06, ease }}
              whileHover={{ y: -4 }}
            >
              <span className="font-orbit text-[10px] tracking-[0.35em] text-mint">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-lg text-fg transition-colors group-hover:text-mint">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-2">{item.body}</p>
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full border border-mint/10 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
