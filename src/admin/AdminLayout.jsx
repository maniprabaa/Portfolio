import { Navigate, Outlet } from 'react-router-dom';
import { CYBERINTEL_URL } from '../lib/site.js';

export default function AdminLayout() {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-stone-100">
      <nav className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-sm font-medium tracking-widest text-stone-700">PORTFOLIO ADMIN</h1>
          <div className="flex items-center gap-4">
            <a
              href={CYBERINTEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              CyberIntel →
            </a>
            <a href="/" className="text-xs text-stone-500 hover:text-stone-800">
              View Site
            </a>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('adminToken');
                window.location.href = '/admin/login';
              }}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
}
