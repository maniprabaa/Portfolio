import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function PageShell({ children, profile, hero = false }) {
  return (
    <div className="noise relative min-h-svh">
      <div className="void-grid pointer-events-none fixed inset-0 opacity-40" aria-hidden="true" />
      <Navbar profile={profile} />
      <main
        id="main-content"
        className={`relative z-10 pb-16 md:pb-24 ${
          hero ? 'pt-20' : 'pt-28 md:pt-36'
        }`}
      >
        {children}
      </main>
      <Footer profile={profile} />
    </div>
  );
}
