import { useEffect, useState } from 'react';
import { resolveAsset } from '../config/baseUrl.js';
import { api } from '../services/api.js';
import {
  blocksToLegacyContent,
  normalizeContentBlocks,
  sanitizeContentBlocks,
} from '../lib/projectContent.js';
import ProjectContentEditor from './components/ProjectContentEditor.jsx';
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminEmpty,
  AdminField,
  AdminInput,
  AdminListItem,
  AdminPageHeader,
  AdminTextarea,
} from './components/AdminUi.jsx';

const empty = {
  title: '',
  languages: '',
  description: '',
  contentBlocks: [{ type: 'text', value: '' }],
  highlights: '',
  image: '',
  liveUrl: '',
  order: 0,
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setError('');
      const list = await api.getProjects();
      setProjects(list);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const contentBlocks = sanitizeContentBlocks(form.contentBlocks);
      const payload = {
        title: form.title,
        languages: form.languages,
        description: form.description,
        image: form.image,
        liveUrl: form.liveUrl,
        order: form.order,
        contentBlocks,
        content: blocksToLegacyContent(contentBlocks),
        highlights: form.highlights
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
      };
      if (editingId) {
        await api.updateProject(editingId, payload);
      } else {
        await api.createProject(payload);
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      languages: project.languages,
      description: project.description,
      contentBlocks: normalizeContentBlocks(project),
      highlights: Array.isArray(project.highlights) ? project.highlights.join('\n') : '',
      image: project.image,
      liveUrl: project.liveUrl || '',
      order: project.order,
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      setError('');
      await api.deleteProject(id);
      setProjects((prev) => prev.filter((project) => project._id !== id));
      await load();
    } catch (err) {
      setError(err.message || 'Failed to delete project. Please log in again if your session expired.');
    }
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
        eyebrow="WORK"
        title="Projects"
        description="Add portfolio projects with images, case-study content, and live demo links."
      />

      {error && (
        <div className="mb-4">
          <AdminAlert type="error">{error}</AdminAlert>
        </div>
      )}

      <AdminCard title={editingId ? 'Update Project' : 'Add Project'} className="mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Title">
              <AdminInput
                placeholder="Project title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </AdminField>
            <AdminField label="Languages">
              <AdminInput
                placeholder="React, Node.js, Express"
                value={form.languages}
                onChange={(e) => setForm({ ...form, languages: e.target.value })}
              />
            </AdminField>
            <AdminField label="Card Image URL">
              <AdminInput
                placeholder="/uploads/project.png"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </AdminField>
            <AdminField label="Live URL">
              <AdminInput
                placeholder="https://example.com"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              />
            </AdminField>
            <AdminField label="Order">
              <AdminInput
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </AdminField>
            <AdminField label="Upload Card Image">
              <AdminInput type="file" accept="image/*" onChange={handleUpload} />
            </AdminField>
          </div>

          <AdminField label="Card Description">
            <AdminTextarea
              placeholder="Short description shown on the project card"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
          </AdminField>

          <AdminField label="Case Study Blog">
            <ProjectContentEditor
              blocks={form.contentBlocks}
              onChange={(contentBlocks) => setForm({ ...form, contentBlocks })}
            />
          </AdminField>

          <AdminField label="Highlights">
            <AdminTextarea
              placeholder="One highlight per line"
              value={form.highlights}
              onChange={(e) => setForm({ ...form, highlights: e.target.value })}
              rows={4}
            />
          </AdminField>

          <div className="flex gap-2">
            <AdminButton type="submit">{editingId ? 'Update Project' : 'Add Project'}</AdminButton>
            {editingId && (
              <AdminButton type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </AdminButton>
            )}
          </div>
        </form>
      </AdminCard>

      <div className="space-y-3">
        {projects.length === 0 ? (
          <AdminEmpty message="No projects added yet." />
        ) : (
          projects.map((project) => (
            <AdminListItem
              key={project._id}
              leading={
                project.image ? (
                  <img
                    src={resolveAsset(project.image)}
                    alt=""
                    className="h-14 w-20 rounded border border-line bg-void object-contain p-1"
                  />
                ) : null
              }
              title={project.title}
              subtitle={project.languages}
              actions={
                <>
                  <AdminButton variant="ghost" onClick={() => handleEdit(project)}>
                    Edit
                  </AdminButton>
                  <AdminButton variant="danger" onClick={() => handleDelete(project._id)}>
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
