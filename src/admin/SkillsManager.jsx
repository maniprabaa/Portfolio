import { useEffect, useState } from 'react';
import { resolveAsset } from '../config/baseUrl.js';
import { api } from '../services/api.js';
import { SKILL_CATEGORIES } from '../lib/skills.js';
import {
  AdminButton,
  AdminCard,
  AdminEmpty,
  AdminField,
  AdminInput,
  AdminListItem,
  AdminPageHeader,
  AdminSelect,
} from './components/AdminUi.jsx';

const empty = { name: '', image: '', category: 'frontend', order: 0 };

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = () => api.getSkills().then(setSkills).catch(console.error);

  useEffect(() => {
    load();
  }, []);

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
    setForm({
      name: skill.name,
      image: skill.image,
      category: skill.category || 'frontend',
      order: skill.order,
    });
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
      <AdminPageHeader
        eyebrow="STACK"
        title="Skills"
        description="Manage skill icons, categories, and display order."
      />

      <AdminCard title={editingId ? 'Update Skill' : 'Add Skill'} className="mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Skill Name">
              <AdminInput
                placeholder="React"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </AdminField>
            <AdminField label="Image URL">
              <AdminInput
                placeholder="/uploads/skills/react.svg"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </AdminField>
            <AdminField label="Category">
              <AdminSelect
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {SKILL_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
            <AdminField label="Order">
              <AdminInput
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </AdminField>
          </div>
          <AdminField label="Upload Icon">
            <AdminInput type="file" accept="image/*" onChange={handleUpload} />
          </AdminField>
          <div className="flex gap-2">
            <AdminButton type="submit">{editingId ? 'Update Skill' : 'Add Skill'}</AdminButton>
            {editingId && (
              <AdminButton
                variant="ghost"
                onClick={() => {
                  setForm(empty);
                  setEditingId(null);
                }}
              >
                Cancel
              </AdminButton>
            )}
          </div>
        </form>
      </AdminCard>

      <div className="space-y-2">
        {skills.length === 0 ? (
          <AdminEmpty message="No skills added yet." />
        ) : (
          skills.map((skill) => (
            <AdminListItem
              key={skill._id}
              leading={
                skill.image ? (
                  <img
                    src={resolveAsset(skill.image)}
                    alt=""
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded border border-line text-[10px] text-fg-3">
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                )
              }
              title={skill.name}
              subtitle={`${skill.category || 'frontend'} · order ${skill.order ?? 0}`}
              actions={
                <>
                  <AdminButton variant="ghost" onClick={() => handleEdit(skill)}>
                    Edit
                  </AdminButton>
                  <AdminButton variant="danger" onClick={() => handleDelete(skill._id)}>
                    Delete
                  </AdminButton>
                </>
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
