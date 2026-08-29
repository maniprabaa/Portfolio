import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../services/api.js';
import {
  AdminButton,
  AdminEmpty,
  AdminPageHeader,
} from './components/AdminUi.jsx';

export default function MessagesInbox() {
  const [messages, setMessages] = useState([]);
  const outletContext = useOutletContext() || {};

  const load = () => api.getMessages().then(setMessages).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const refreshUnread = async () => {
    await load();
    if (outletContext.refreshUnread) {
      await outletContext.refreshUnread();
    }
  };

  const markRead = async (id) => {
    await api.markMessageRead(id);
    await refreshUnread();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await api.deleteMessage(id);
    await refreshUnread();
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="INBOX"
        title="Contact Messages"
        description="Read and manage messages sent from your contact form."
      />

      <div className="space-y-3">
        {messages.length === 0 ? (
          <AdminEmpty message="No messages yet." />
        ) : (
          messages.map((msg) => (
            <article
              key={msg._id}
              className={`rounded-xl border p-5 transition ${
                msg.read
                  ? 'border-line bg-void-2/50'
                  : 'border-mint/30 bg-mint/5'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-fg">{msg.name}</p>
                    {!msg.read && (
                      <span className="rounded-full border border-mint/30 bg-mint/10 px-2 py-0.5 text-[10px] tracking-wider text-mint">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-fg-3">{msg.email}</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-2">{msg.message}</p>
                  <p className="mt-3 text-[10px] tracking-wider text-fg-3">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {!msg.read && (
                    <AdminButton variant="ghost" onClick={() => markRead(msg._id)}>
                      Mark read
                    </AdminButton>
                  )}
                  <AdminButton variant="danger" onClick={() => handleDelete(msg._id)}>
                    Delete
                  </AdminButton>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
