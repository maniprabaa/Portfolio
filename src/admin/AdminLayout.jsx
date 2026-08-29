import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ADMIN_LOGIN } from '../lib/site.js';
import { api } from '../services/api.js';
import { AdminSidebar, AdminTopBar } from './components/AdminUi.jsx';

export default function AdminLayout() {
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token) return;
    api
      .getMessages()
      .then((messages) => setUnreadCount(messages.filter((msg) => !msg.read).length))
      .catch(() => {});
  }, [token]);

  if (!token) return <Navigate to={ADMIN_LOGIN} replace />;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate(ADMIN_LOGIN);
  };

  return (
    <div className="noise min-h-screen bg-void text-fg">
      <div className="void-grid pointer-events-none fixed inset-0 opacity-20" aria-hidden="true" />
      <div className="relative z-10 flex min-h-screen">
        <AdminSidebar unreadCount={unreadCount} />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopBar onLogout={handleLogout} unreadCount={unreadCount} />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto max-w-6xl">
              <Outlet context={{ refreshUnread: async () => {
                const messages = await api.getMessages();
                setUnreadCount(messages.filter((msg) => !msg.read).length);
              } }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
