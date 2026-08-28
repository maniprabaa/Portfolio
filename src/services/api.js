import { baseUrl } from '../config/baseUrl.js';

function getToken() {
  return localStorage.getItem('adminToken');
}

async function request(path, options = {}) {
  const headers = { ...options.headers };

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
    body:
      options.body instanceof FormData || options.body === undefined
        ? options.body
        : JSON.stringify(options.body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const api = {
  getPortfolio: () => request('/portfolio'),
  login: (body) => request('/auth/login', { method: 'POST', body }),
  getProfile: () => request('/profile'),
  updateProfile: (body) => request('/profile', { method: 'PUT', body }),
  getSkills: () => request('/skills'),
  createSkill: (body) => request('/skills', { method: 'POST', body }),
  updateSkill: (id, body) => request(`/skills/${id}`, { method: 'PUT', body }),
  deleteSkill: (id) => request(`/skills/${id}`, { method: 'DELETE' }),
  getProjects: () => request('/projects'),
  createProject: (body) => request('/projects', { method: 'POST', body }),
  updateProject: (id, body) => request(`/projects/${id}`, { method: 'PUT', body }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
  getWorlds: () => request('/worlds'),
  createWorld: (body) => request('/worlds', { method: 'POST', body }),
  updateWorld: (id, body) => request(`/worlds/${id}`, { method: 'PUT', body }),
  deleteWorld: (id) => request(`/worlds/${id}`, { method: 'DELETE' }),
  sendContact: (body) => request('/contact', { method: 'POST', body }),
  getMessages: () => request('/contact'),
  markMessageRead: (id) => request(`/contact/${id}/read`, { method: 'PATCH' }),
  deleteMessage: (id) => request(`/contact/${id}`, { method: 'DELETE' }),
  uploadFile: (file) => {
    const form = new FormData();
    form.append('file', file);
    return request('/upload', { method: 'POST', body: form });
  },
};
