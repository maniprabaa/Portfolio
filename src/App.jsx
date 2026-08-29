import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ADMIN_BASE, ADMIN_LOGIN } from './lib/site.js';
import Seo from './components/Seo.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
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
    <HashRouter>
      <Seo />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path={ADMIN_LOGIN} element={<AdminLogin />} />
        <Route path={ADMIN_BASE} element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="worlds" element={<WorldsManager />} />
          <Route path="messages" element={<MessagesInbox />} />
        </Route>
        <Route path="/admin/login" element={<Navigate to={ADMIN_LOGIN} replace />} />
        <Route path="/admin/*" element={<Navigate to={ADMIN_BASE} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
