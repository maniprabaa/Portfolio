import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TechVoidBrand from '../ui/TechVoidBrand.jsx';
import { NAV_LINKS } from '../../lib/site.js';

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = NAV_LINKS.map(({ name, path }) => ({
    label: name.toUpperCase(),
    href: path,
  }));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="mx-auto flex max-w-page items-center justify-between px-6 md:px-10">
          <div
            className={`nav-glass pointer-events-none absolute inset-0 transition-opacity duration-500 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="relative z-10">
            <TechVoidBrand showWordmark />
          </div>

          <nav className="relative z-10 hidden items-center gap-10 md:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`group relative font-display text-[12px] tracking-[0.25em] transition-colors ${
                  location.pathname === l.href ? 'text-mint' : 'text-fg-2 hover:text-fg'
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-mint transition-all duration-300 ${
                    location.pathname === l.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/contact"
              className="border border-line px-5 py-2.5 font-display text-[12px] tracking-[0.25em] text-fg transition-all duration-300 hover:border-mint/50 hover:bg-mint/5 hover:text-mint"
            >
              HIRE ME →
            </Link>
          </nav>

          <button
            type="button"
            className="relative z-10 flex h-11 w-11 items-center justify-center border border-line text-fg md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="void-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative flex items-center justify-between px-6 py-6">
              <TechVoidBrand showWordmark />
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center border border-line text-fg"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav
              className="relative flex flex-1 flex-col items-start justify-center gap-2 px-8"
              aria-label="Mobile"
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <Link
                    to={l.href}
                    className="flex items-baseline gap-4 py-3 font-display text-5xl font-medium tracking-tight text-fg transition-colors hover:text-mint"
                  >
                    <span className="font-orbit text-xs text-fg-3">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.p
              className="relative px-8 pb-10 font-orbit text-[10px] tracking-[0.35em] text-fg-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              BUILT FROM THE VOID
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
