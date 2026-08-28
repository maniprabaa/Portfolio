import { Link } from 'react-router-dom';
import { CYBERINTEL_URL } from '../lib/site.js';

const links = [
  { to: '/admin/profile', label: 'Profile', desc: 'Name, bio, resume' },
  { to: '/admin/worlds', label: 'Worlds', desc: 'Walking sections & acts' },
  { to: '/admin/skills', label: 'Skills', desc: 'Tech stack icons' },
  { to: '/admin/projects', label: 'Projects', desc: 'Portfolio work' },
  { to: '/admin/messages', label: 'Messages', desc: 'Contact inbox' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-medium text-stone-800">Dashboard</h2>

      <a
        href={CYBERINTEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-8 flex items-center justify-between rounded-xl border border-stone-300 bg-stone-900 p-6 text-white transition hover:border-stone-500"
      >
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-400">External product</p>
          <h3 className="mt-1 text-lg font-medium">CyberIntel</h3>
          <p className="mt-1 text-sm text-stone-400">
            Cybersecurity current affairs platform
          </p>
        </div>
        <span className="text-sm text-stone-300">Open →</span>
      </a>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="rounded-xl border border-stone-200 bg-white p-6 transition hover:border-stone-400 hover:shadow-sm"
          >
            <h3 className="font-medium text-stone-800">{link.label}</h3>
            <p className="mt-1 text-sm text-stone-500">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
