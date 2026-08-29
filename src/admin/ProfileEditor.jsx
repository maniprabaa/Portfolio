import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminPageHeader,
  AdminTextarea,
} from './components/AdminUi.jsx';

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

  if (!profile) {
    return <p className="text-sm text-fg-3">Loading profile...</p>;
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="CONTENT"
        title="Edit Profile"
        description="Update your hero section, about details, profile photo, and resume."
      />

      <AdminCard>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map(({ key, label, textarea }) => (
              <AdminField key={key} label={label}>
                {textarea ? (
                  <AdminTextarea
                    value={profile[key] || ''}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <AdminInput
                    value={profile[key] || ''}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  />
                )}
              </AdminField>
            ))}
          </div>

          <div className="grid gap-4 border-t border-line pt-4 md:grid-cols-2">
            <AdminField label="Upload Profile Image">
              <AdminInput type="file" accept="image/*" onChange={(e) => handleUpload(e, 'profileImage')} />
            </AdminField>
            <AdminField label="Upload Resume">
              <AdminInput type="file" accept=".pdf" onChange={(e) => handleUpload(e, 'resumeUrl')} />
            </AdminField>
          </div>

          {status && (
            <AdminAlert type={status.includes('success') ? 'success' : 'error'}>{status}</AdminAlert>
          )}

          <AdminButton type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </AdminButton>
        </form>
      </AdminCard>
    </div>
  );
}
