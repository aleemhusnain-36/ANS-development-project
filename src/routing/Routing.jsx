import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Frontend/Home/Home';
import About from '../pages/Frontend/About/About';
import Services from '../pages/Frontend/Services/Services';
import Projects from '../pages/Frontend/Projects/Projects';
import ProjectDetails from '../pages/Frontend/Projects/ProjectDetails';
import Contact from '../pages/Frontend/Contact/Contact';
import Auth from '../pages/Auth/Auth';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';

const Routing = () => {
  return (
    <Routes>
      {/* Frontend Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/contact" element={<Contact />} />

      {/* Redirect old portal links directly to user dashboard */}
      <Route path="/portals" element={<Navigate to="/dashboard/user" replace />} />
      <Route path="/portal" element={<Navigate to="/dashboard/user" replace />} />

      {/* Auth Routes */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* Dashboards */}
      <Route path="/dashboard/user" element={<UserDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/portal/user" element={<UserDashboard />} />
      <Route path="/portal/client" element={<UserDashboard />} />
      <Route path="/portal/admin" element={<AdminDashboard />} />

      {/* Wildcard Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Routing;