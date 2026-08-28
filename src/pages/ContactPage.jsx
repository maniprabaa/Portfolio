import { useState } from 'react';
import PageShell from '../components/layout/PageShell.jsx';
import { StandalonePageLinks } from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { api } from '../services/api.js';
import { usePortfolio, PageLoader, PageError } from '../hooks/usePortfolio.jsx';

const inputClass =
  'w-full border-0 border-b border-line bg-transparent px-0 py-4 text-sm text-fg placeholder:text-fg-3 transition-colors duration-300 focus:border-mint/60 focus:outline-none';

const labelClass = 'font-orbit text-[9px] tracking-[0.4em] text-fg-3';

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const form = new FormData(e.currentTarget);
    try {
      await api.sendContact({
        name: form.get('name'),
        email: form.get('email'),
        message: form.get('message'),
      });
      setSubmitted(true);
      e.target.reset();
    } catch (err) {
      setError(err.message || 'Transmission failed. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-mint/30 bg-mint/5 p-10">
        <p className="font-orbit text-[10px] tracking-[0.4em] text-mint">TRANSMISSION RECEIVED</p>
        <p className="mt-4 font-display text-2xl text-fg">Message sent successfully.</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 font-display text-[12px] tracking-[0.25em] text-fg-2 transition hover:text-mint"
        >
          SEND ANOTHER →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <label className={labelClass} htmlFor="name">NAME</label>
        <input id="name" name="name" required className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label className={labelClass} htmlFor="email">EMAIL</label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="you@email.com" />
      </div>
      <div>
        <label className={labelClass} htmlFor="message">MESSAGE</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Tell me about your project..."
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="group inline-flex items-center gap-3 bg-fg px-7 py-4 font-display text-[12px] font-medium tracking-[0.25em] text-void transition-all hover:bg-mint disabled:opacity-50"
      >
        {sending ? 'SENDING...' : 'SEND INTO THE VOID'}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}

export default function ContactPage() {
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

  return (
    <PageShell profile={profile}>
      <section className="mx-auto max-w-page px-6 md:px-10">
        <div className="grid gap-20 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">/ 04 — CONTACT</p>
              <h1 className="mt-8 font-display text-5xl font-medium leading-[1.02] tracking-[-0.03em] md:text-7xl">
                LET&apos;S BUILD
                <br />
                SOMETHING
                <br />
                <span className="text-mint">TOGETHER.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-md text-sm leading-relaxed text-fg-2 md:text-base">
                Have a project in mind? Reach out and let&apos;s discuss how we can work together.
              </p>
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-6 inline-block font-display text-[12px] tracking-[0.2em] text-mint transition hover:text-fg"
                >
                  {profile.email}
                </a>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <StandalonePageLinks currentPath="/contact" />
    </PageShell>
  );
}
