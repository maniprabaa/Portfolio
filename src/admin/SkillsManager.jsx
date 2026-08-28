import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { resolveAsset } from '../config/baseUrl.js';
import { api } from '../services/api.js';

const empty = { name: '', image: '', order: 0 };

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = () => api.getSkills().then(setSkills).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.updateSkill(editingId, form);
    } else {
      await api.createSkill(form);
    }
    setForm(empty);
    setEditingId(null);
    load();
  };

  const handleEdit = (skill) => {
    setForm({ name: skill.name, image: skill.image, order: skill.order });
    setEditingId(skill._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    await api.deleteSkill(id);
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
      <h2 className="mb-6 mt-2 text-xl font-medium text-stone-800">Skills</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-3 rounded-xl border border-stone-200 bg-white p-6">
        <input
          placeholder="Skill name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
        />
        <input type="file" accept="image/*" onChange={handleUpload} />
        <input
          type="number"
          placeholder="Order"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
        />
        <button type="submit" className="rounded-lg bg-stone-800 px-4 py-2 text-sm text-white">
          {editingId ? 'Update' : 'Add'} Skill
        </button>
      </form>

      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill._id} className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              {skill.image && <img src={resolveAsset(skill.image)} alt="" className="h-8 w-8 object-contain" />}
              <span className="text-sm text-stone-700">{skill.name}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleEdit(skill)} className="text-xs text-stone-500 hover:text-stone-800">Edit</button>
              <button type="button" onClick={() => handleDelete(skill._id)} className="text-xs text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
