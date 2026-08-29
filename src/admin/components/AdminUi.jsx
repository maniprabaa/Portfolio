import { NavLink } from 'react-router-dom';
import {
  Code2,
  ExternalLink,
  FolderKanban,
  Globe,
  LayoutDashboard,
  LogOut,
  Mail,
  User,
} from 'lucide-react';
import { ADMIN_BASE } from '../../lib/site.js';

export const ADMIN_NAV = [
  { to: ADMIN_BASE, label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: `${ADMIN_BASE}/profile`, label: 'Profile', icon: User },
  { to: `${ADMIN_BASE}/worlds`, label: 'Worlds', icon: Globe },
  { to: `${ADMIN_BASE}/skills`, label: 'Skills', icon: Code2 },
  { to: `${ADMIN_BASE}/projects`, label: 'Projects', icon: FolderKanban },
  { to: `${ADMIN_BASE}/messages`, label: 'Messages', icon: Mail },
];

export const inputClass =
  'w-full rounded-lg border border-line bg-void-2 px-3 py-2.5 text-sm text-fg outline-none transition placeholder:text-fg-3 focus:border-mint/40 focus:ring-1 focus:ring-mint/20';

export const labelClass = 'mb-1.5 block text-[11px] tracking-[0.15em] text-fg-3 uppercase';

export function AdminPageHeader({ eyebrow, title, description, backTo = ADMIN_BASE }) {
  return (
    <div className="mb-8">
      <NavLink to={backTo} className="text-[11px] tracking-[0.2em] text-fg-3 transition hover:text-mint">
        ← BACK
      </NavLink>
      {eyebrow && (
        <p className="mt-4 font-orbit text-[10px] tracking-[0.45em] text-fg-3">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-display text-2xl font-medium text-fg md:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm text-fg-2">{description}</p>}
    </div>
  );
}

export function AdminCard({ title, description, children, className = '' }) {
  return (
    <section className={`rounded-xl border border-line bg-surface/80 p-6 ${className}`}>
      {title && <h3 className="font-display text-sm tracking-[0.12em] text-fg">{title}</h3>}
      {description && <p className="mt-1 text-sm text-fg-2">{description}</p>}
      {children && <div className={title || description ? 'mt-5' : ''}>{children}</div>}
    </section>
  );
}

export function AdminField({ label, children }) {
  return (
    <div>
      {label && <label className={labelClass}>{label}</label>}
      {children}
    </div>
  );
}

export function AdminInput(props) {
  return <input className={inputClass} {...props} />;
}

export function AdminTextarea(props) {
  return <textarea className={`${inputClass} resize-y`} {...props} />;
}

export function AdminSelect(props) {
  return <select className={inputClass} {...props} />;
}

export function AdminButton({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    primary:
      'border border-mint/30 bg-mint/10 text-mint hover:bg-mint/20 disabled:opacity-50',
    ghost:
      'border border-line bg-transparent text-fg-2 hover:border-mint/30 hover:text-mint disabled:opacity-50',
    danger:
      'border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 disabled:opacity-50',
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs tracking-[0.15em] transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminAlert({ type = 'error', children }) {
  const styles = {
    error: 'border-red-500/30 bg-red-500/10 text-red-200',
    success: 'border-mint/30 bg-mint/10 text-mint',
  };

  return (
    <p className={`rounded-lg border px-3 py-2 text-sm ${styles[type]}`}>{children}</p>
  );
}

export function AdminListItem({ leading, title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-line bg-void-2/60 px-4 py-3 transition hover:border-mint/20">
      <div className="flex min-w-0 items-start gap-3">
        {leading}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-fg">{title}</p>
          {subtitle && <p className="mt-1 text-xs text-fg-3">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </div>
  );
}

export function AdminEmpty({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-line px-6 py-10 text-center">
      <p className="text-sm text-fg-3">{message}</p>
    </div>
  );
}

export function AdminStatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-line bg-surface/80 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-[0.15em] text-fg-3">{label}</p>
          <p className="mt-2 font-display text-3xl text-fg">{value}</p>
        </div>
        {Icon && (
          <div className="rounded-lg border border-line bg-void-2 p-2 text-mint">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminNavItem({ to, label, icon: Icon, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
          isActive
            ? 'border-mint/30 bg-mint/10 text-mint'
            : 'border-transparent text-fg-2 hover:border-line hover:bg-void-2/80 hover:text-fg'
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
}

export function AdminSidebar({ unreadCount = 0 }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface/90 lg:flex">
      <div className="border-b border-line px-5 py-6">
        <p className="font-orbit text-[10px] tracking-[0.45em] text-fg-3">CONTROL</p>
        <h1 className="mt-2 font-display text-lg text-fg">Portfolio Admin</h1>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {ADMIN_NAV.map((item) => (
          <div key={item.to} className="relative">
            <AdminNavItem {...item} />
            {item.to === `${ADMIN_BASE}/messages` && unreadCount > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-mint px-1.5 py-0.5 text-[10px] font-medium text-void">
                {unreadCount}
              </span>
            )}
          </div>
        ))}
      </nav>
      <div className="border-t border-line p-4">
        <a
          href="/"
          className="mb-2 flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-fg-2 transition hover:border-mint/30 hover:text-mint"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Site
        </a>
      </div>
    </aside>
  );
}

export function AdminTopBar({ onLogout, unreadCount = 0 }) {
  return (
    <header className="border-b border-line bg-surface/80 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-orbit text-[10px] tracking-[0.45em] text-fg-3 lg:hidden">ADMIN</p>
          <p className="text-sm text-fg-2 lg:hidden">Portfolio Control Panel</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs text-fg-2 transition hover:border-mint/30 hover:text-mint lg:hidden"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Site
          </a>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500/10"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>
      <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {ADMIN_NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition ${
                isActive
                  ? 'border-mint/30 bg-mint/10 text-mint'
                  : 'border-line text-fg-3 hover:text-fg'
              }`
            }
          >
            {item.label}
            {item.to === `${ADMIN_BASE}/messages` && unreadCount > 0 ? ` (${unreadCount})` : ''}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
