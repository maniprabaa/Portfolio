import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

export default function MessagesInbox() {
  const [messages, setMessages] = useState([]);

  const load = () => api.getMessages().then(setMessages).catch(console.error);
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.markMessageRead(id);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await api.deleteMessage(id);
    load();
  };

  return (
    <div>
      <Link to="/admin" className="text-xs text-stone-500 hover:text-stone-800">← Back</Link>
      <h2 className="mb-6 mt-2 text-xl font-medium text-stone-800">Contact Messages</h2>

      <div className="space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-stone-400">No messages yet.</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`rounded-lg border p-4 ${msg.read ? 'border-stone-200 bg-white' : 'border-stone-400 bg-stone-50'}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-stone-800">{msg.name}</p>
                <p className="text-xs text-stone-400">{msg.email}</p>
                <p className="mt-2 text-sm text-stone-600">{msg.message}</p>
                <p className="mt-1 text-[10px] text-stone-300">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {!msg.read && (
                  <button type="button" onClick={() => markRead(msg._id)} className="text-xs text-stone-500">
                    Mark read
                  </button>
                )}
                <button type="button" onClick={() => handleDelete(msg._id)} className="text-xs text-red-500">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
