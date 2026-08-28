import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

const sectionTypes = ['intro', 'about', 'skills', 'projects', 'contact'];
const empty = { act: '', title: '', description: '', hint: '', sectionType: 'intro', order: 0 };

export default function WorldsManager() {
  const [worlds, setWorlds] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = () => api.getWorlds().then(setWorlds).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.updateWorld(editingId, form);
    } else {
      await api.createWorld(form);
    }
    setForm(empty);
    setEditingId(null);
    load();
  };

  const handleEdit = (world) => {
    setForm({
      act: world.act,
      title: world.title,
      description: world.description,
      hint: world.hint,
      sectionType: world.sectionType,
      order: world.order,
    });
    setEditingId(world._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this world?')) return;
    await api.deleteWorld(id);
    load();
  };

  return (
    <div>
      <Link to="/admin" className="text-xs text-stone-500 hover:text-stone-800">← Back</Link>
      <h2 className="mb-6 mt-2 text-xl font-medium text-stone-800">Walking Worlds</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-3 rounded-xl border border-stone-200 bg-white p-6">
        <input placeholder="Act (e.g. ACT I)" value={form.act} onChange={(e) => setForm({ ...form, act: e.target.value })} required className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <input placeholder="Hint text" value={form.hint} onChange={(e) => setForm({ ...form, hint: e.target.value })} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <select value={form.sectionType} onChange={(e) => setForm({ ...form, sectionType: e.target.value })} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm">
          {sectionTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <button type="submit" className="rounded-lg bg-stone-800 px-4 py-2 text-sm text-white">
          {editingId ? 'Update' : 'Add'} World
        </button>
      </form>

      <div className="space-y-2">
        {worlds.map((world) => (
          <div key={world._id} className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-3">
            <div>
              <p className="text-sm font-medium text-stone-800">{world.act} / {world.title}</p>
              <p className="text-xs text-stone-400">{world.sectionType} · {world.description}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleEdit(world)} className="text-xs text-stone-500">Edit</button>
              <button type="button" onClick={() => handleDelete(world._id)} className="text-xs text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
