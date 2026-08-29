import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import {
  AdminButton,
  AdminCard,
  AdminEmpty,
  AdminField,
  AdminInput,
  AdminListItem,
  AdminPageHeader,
  AdminSelect,
  AdminTextarea,
} from './components/AdminUi.jsx';

const sectionTypes = ['intro', 'about', 'skills', 'projects', 'contact'];
const empty = { act: '', title: '', description: '', hint: '', sectionType: 'intro', order: 0 };

export default function WorldsManager() {
  const [worlds, setWorlds] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = () => api.getWorlds().then(setWorlds).catch(console.error);

  useEffect(() => {
    load();
  }, []);

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
      <AdminPageHeader
        eyebrow="SECTIONS"
        title="Walking Worlds"
        description="Manage walking portfolio sections, acts, and hints."
      />

      <AdminCard title={editingId ? 'Update World' : 'Add World'} className="mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Act">
              <AdminInput
                placeholder="ACT I"
                value={form.act}
                onChange={(e) => setForm({ ...form, act: e.target.value })}
                required
              />
            </AdminField>
            <AdminField label="Title">
              <AdminInput
                placeholder="ORIGIN"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </AdminField>
            <AdminField label="Section Type">
              <AdminSelect
                value={form.sectionType}
                onChange={(e) => setForm({ ...form, sectionType: e.target.value })}
              >
                {sectionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
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
          <AdminField label="Description">
            <AdminTextarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
            />
          </AdminField>
          <AdminField label="Hint">
            <AdminInput
              value={form.hint}
              onChange={(e) => setForm({ ...form, hint: e.target.value })}
            />
          </AdminField>
          <div className="flex gap-2">
            <AdminButton type="submit">{editingId ? 'Update World' : 'Add World'}</AdminButton>
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
        {worlds.length === 0 ? (
          <AdminEmpty message="No worlds configured yet." />
        ) : (
          worlds.map((world) => (
            <AdminListItem
              key={world._id}
              title={`${world.act} / ${world.title}`}
              subtitle={`${world.sectionType} · ${world.description}`}
              actions={
                <>
                  <AdminButton variant="ghost" onClick={() => handleEdit(world)}>
                    Edit
                  </AdminButton>
                  <AdminButton variant="danger" onClick={() => handleDelete(world._id)}>
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
