import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Shield } from 'lucide-react';
import { ADMIN_BASE } from '../lib/site.js';
import { api } from '../services/api.js';
import { AdminAlert, AdminButton, AdminCard, AdminField, AdminInput } from './components/AdminUi.jsx';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await api.login(form);
      localStorage.setItem('adminToken', token);
      navigate(ADMIN_BASE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="noise relative flex min-h-screen items-center justify-center bg-void px-4">
      <div className="void-grid pointer-events-none fixed inset-0 opacity-20" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-mint/30 bg-mint/10 text-mint">
            <Shield className="h-5 w-5" />
          </div>
          <p className="font-orbit text-[10px] tracking-[0.45em] text-fg-3">SECURE ACCESS</p>
          <h1 className="mt-2 font-display text-3xl text-fg">Portfolio Admin</h1>
          <p className="mt-2 text-sm text-fg-2">Sign in to manage your portfolio content.</p>
        </div>

        <AdminCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AdminField label="Email">
              <AdminInput
                type="email"
                placeholder="admin@portfolio.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </AdminField>
            <AdminField label="Password">
              <AdminInput
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </AdminField>
            {error && <AdminAlert type="error">{error}</AdminAlert>}
            <AdminButton
              type="submit"
              disabled={loading}
              className="w-full"
            >
              <Lock className="h-3.5 w-3.5" />
              {loading ? 'Signing in...' : 'Sign In'}
            </AdminButton>
          </form>
        </AdminCard>

        <p className="mt-6 text-center text-xs text-fg-3">
          Default: admin@portfolio.com / admin123
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-xs tracking-[0.15em] text-fg-3 transition hover:text-mint">
            ← BACK TO SITE
          </Link>
        </p>
      </div>
    </div>
  );
}
