import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

const fields = [
  { key: 'siteTitle', label: 'Site Title' },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'name', label: 'Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'intro', label: 'Intro', textarea: true },
  { key: 'age', label: 'Age' },
  { key: 'email', label: 'Email' },
  { key: 'freelance', label: 'Freelance' },
  { key: 'codingLanguages', label: 'Coding Languages', textarea: true },
  { key: 'skillTitle', label: 'Skill Title' },
  { key: 'experience', label: 'Experience' },
  { key: 'languages', label: 'Languages' },
  { key: 'internshipMonths', label: 'Internship Months' },
  { key: 'projectsCount', label: 'Projects Count' },
  { key: 'profileImage', label: 'Profile Image URL' },
  { key: 'resumeUrl', label: 'Resume URL' },
];

export default function ProfileEditor() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getProfile().then(setProfile).catch(console.error);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');
    try {
      const updated = await api.updateProfile(profile);
      setProfile(updated);
      setStatus('Saved successfully');
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await api.uploadFile(file);
      setProfile({ ...profile, [field]: url });
    } catch (err) {
      setStatus(err.message);
    }
  };

  if (!profile) return <p className="text-stone-500">Loading...</p>;

  return (
    <div>
      <Link to="/admin" className="text-xs text-stone-500 hover:text-stone-800">
        ← Back
      </Link>
      <h2 className="mb-6 mt-2 text-xl font-medium text-stone-800">Edit Profile</h2>
      <form onSubmit={handleSave} className="space-y-4 rounded-xl border border-stone-200 bg-white p-6">
        {fields.map(({ key, label, textarea }) => (
          <div key={key}>
            <label className="mb-1 block text-xs text-stone-500">{label}</label>
            {textarea ? (
              <textarea
                value={profile[key] || ''}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400"
              />
            ) : (
              <input
                value={profile[key] || ''}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400"
              />
            )}
          </div>
        ))}
        <div className="flex gap-4">
          <div>
            <label className="mb-1 block text-xs text-stone-500">Upload Profile Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'profileImage')} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">Upload Resume</label>
            <input type="file" accept=".pdf" onChange={(e) => handleUpload(e, 'resumeUrl')} />
          </div>
        </div>
        {status && (
          <p className={`text-sm ${status.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
            {status}
          </p>
        )}
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-stone-800 px-6 py-2 text-sm text-white hover:bg-stone-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
