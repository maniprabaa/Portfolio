import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import ProfileEditor from './admin/ProfileEditor.jsx';
import SkillsManager from './admin/SkillsManager.jsx';
import ProjectsManager from './admin/ProjectsManager.jsx';
import WorldsManager from './admin/WorldsManager.jsx';
import MessagesInbox from './admin/MessagesInbox.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="worlds" element={<WorldsManager />} />
          <Route path="messages" element={<MessagesInbox />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
