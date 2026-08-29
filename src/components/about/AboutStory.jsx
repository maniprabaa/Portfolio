import Reveal from '../ui/Reveal.jsx';

export default function AboutStory() {
  return (
    <section className="border-t border-line pt-20 md:pt-28" aria-labelledby="about-story">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <Reveal>
          <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">MY STORY</p>
          <h2 id="about-story" className="mt-4 font-display text-3xl font-medium md:text-4xl">
            From curiosity to complete products.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <p className="text-base leading-8 text-fg-2 md:text-lg">
              I started building because I was curious about how technology works. That curiosity
              slowly became something bigger. I didn&apos;t want to only work on small pieces of
              someone else&apos;s vision.
            </p>
            <p className="mt-6 text-base leading-8 text-fg-2 md:text-lg">
              I wanted to understand the entire journey — from an idea, to design, development,
              backend systems, deployment, infrastructure, and finally a real product used by real
              people.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-line bg-void-2/50 p-8">
              <p className="font-orbit text-[9px] tracking-[0.35em] text-mint">THE SHIFT</p>
              <p className="mt-4 text-base leading-8 text-fg-2">
                That mindset is what led me to build{' '}
                <span className="font-display text-fg">TechVoid</span> — not as a label, but as a
                philosophy for how I approach technology.
              </p>
              <blockquote className="mt-6 border-l border-mint/40 pl-4 text-sm italic text-fg-2 md:text-base">
                &ldquo;I don&apos;t need to know everything before I start. If I don&apos;t know
                something, I learn it. If something breaks, I debug it. If a deployment fails, I
                solve it.&rdquo;
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
