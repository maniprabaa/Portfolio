export const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export function resolveAsset(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const origin = baseUrl.replace(/\/api\/v1\/?$/, '');
  return `${origin}${path}`;
}
