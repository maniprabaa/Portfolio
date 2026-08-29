import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, FolderKanban, Globe, Mail } from 'lucide-react';
import { ADMIN_BASE } from '../lib/site.js';
import { api } from '../services/api.js';
import { ADMIN_NAV, AdminCard, AdminStatCard } from './components/AdminUi.jsx';

const quickLinks = ADMIN_NAV.filter((item) => !item.end).map((item) => ({
  ...item,
  desc:
    item.label === 'Profile'
      ? 'Name, bio, resume'
      : item.label === 'Worlds'
        ? 'Walking sections & acts'
        : item.label === 'Skills'
          ? 'Tech stack icons'
          : item.label === 'Projects'
            ? 'Portfolio work'
            : 'Contact inbox',
}));

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    skills: 0,
    projects: 0,
    worlds: 0,
    unread: 0,
  });

  useEffect(() => {
    Promise.all([api.getSkills(), api.getProjects(), api.getWorlds(), api.getMessages()])
      .then(([skills, projects, worlds, messages]) => {
        setStats({
          skills: skills.length,
          projects: projects.length,
          worlds: worlds.length,
          unread: messages.filter((msg) => !msg.read).length,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="font-orbit text-[10px] tracking-[0.45em] text-fg-3">OVERVIEW</p>
        <h2 className="mt-2 font-display text-3xl text-fg">Dashboard</h2>
        <p className="mt-2 text-sm text-fg-2">
          Manage portfolio content, projects, skills, and contact messages.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Skills" value={stats.skills} icon={Code2} />
        <AdminStatCard label="Projects" value={stats.projects} icon={FolderKanban} />
        <AdminStatCard label="Worlds" value={stats.worlds} icon={Globe} />
        <AdminStatCard label="Unread Messages" value={stats.unread} icon={Mail} />
      </div>

      <AdminCard title="QUICK MANAGE" description="Jump into any section to update your site content.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map(({ to, label, desc, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-xl border border-line bg-void-2/60 p-5 transition hover:border-mint/30 hover:bg-void-2"
            >
              <div className="mb-4 inline-flex rounded-lg border border-line bg-surface p-2 text-mint transition group-hover:border-mint/30">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="font-display text-sm tracking-[0.1em] text-fg">{label}</h3>
              <p className="mt-1 text-sm text-fg-2">{desc}</p>
              <span className="mt-4 inline-block text-[10px] tracking-[0.2em] text-mint opacity-80 transition group-hover:opacity-100">
                OPEN →
              </span>
            </Link>
          ))}
        </div>
      </AdminCard>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <AdminCard title="Profile" description="Update hero content, bio, and resume links.">
          <Link to={`${ADMIN_BASE}/profile`} className="text-xs tracking-[0.15em] text-mint hover:underline">
            Edit profile →
          </Link>
        </AdminCard>
        <AdminCard title="Projects" description="Add portfolio work with images and live demo links.">
          <Link to={`${ADMIN_BASE}/projects`} className="text-xs tracking-[0.15em] text-mint hover:underline">
            Manage projects →
          </Link>
        </AdminCard>
      </div>
    </div>
  );
}
