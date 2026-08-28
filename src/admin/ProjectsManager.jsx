import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { resolveAsset } from '../config/baseUrl.js';
import { api } from '../services/api.js';

const empty = { title: '', languages: '', description: '', image: '', order: 0 };

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = () => api.getProjects().then(setProjects).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.updateProject(editingId, form);
    } else {
      await api.createProject(form);
    }
    setForm(empty);
    setEditingId(null);
    load();
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      languages: project.languages,
      description: project.description,
      image: project.image,
      order: project.order,
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api.deleteProject(id);
    load();
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url } = await api.uploadFile(file);
    setForm({ ...form, image: url });
  };

  return (
    <div>
      <Link to="/admin" className="text-xs text-stone-500 hover:text-stone-800">← Back</Link>
      <h2 className="mb-6 mt-2 text-xl font-medium text-stone-800">Projects</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-3 rounded-xl border border-stone-200 bg-white p-6">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <input placeholder="Languages" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <input type="file" accept="image/*" onChange={handleUpload} />
        <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <button type="submit" className="rounded-lg bg-stone-800 px-4 py-2 text-sm text-white">
          {editingId ? 'Update' : 'Add'} Project
        </button>
      </form>

      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project._id} className="flex items-start justify-between rounded-lg border border-stone-200 bg-white p-4">
            <div className="flex gap-4">
              {project.image && <img src={resolveAsset(project.image)} alt="" className="h-16 w-24 rounded object-cover" />}
              <div>
                <p className="font-medium text-stone-800">{project.title}</p>
                <p className="text-xs text-stone-400">{project.languages}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleEdit(project)} className="text-xs text-stone-500">Edit</button>
              <button type="button" onClick={() => handleDelete(project._id)} className="text-xs text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
