import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import ExpertisePage from '@/pages/ExpertisePage';
import ProjectsPage from '@/pages/ProjectsPage';
import RentalsPage from '@/pages/RentalsPage';
import GalleryPage from '@/pages/GalleryPage';
import ContactPage from '@/pages/ContactPage';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import NotFoundPage from '@/pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{
          style: { background: '#001E42', color: '#fff', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' },
          success: { iconTheme: { primary: '#FFB81C', secondary: '#001E42' } },
        }} />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/materiel" element={<RentalsPage />} />
            <Route path="/galerie" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
