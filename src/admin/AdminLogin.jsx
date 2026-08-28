import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

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
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-stone-200 bg-white p-8 shadow-sm"
      >
        <h1 className="mb-6 text-center text-lg font-medium text-stone-800">Admin Login</h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full rounded-lg border border-stone-200 px-4 py-2 text-sm outline-none focus:border-stone-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full rounded-lg border border-stone-200 px-4 py-2 text-sm outline-none focus:border-stone-400"
          />
        </div>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-stone-800 py-2 text-sm text-white transition hover:bg-stone-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="mt-4 text-center text-xs text-stone-400">
          Default: admin@portfolio.com / admin123
        </p>
      </form>
    </div>
  );
}
