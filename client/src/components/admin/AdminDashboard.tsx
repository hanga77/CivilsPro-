import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminOverview from './AdminOverview';
import AdminProjects from './AdminProjects';
import AdminIndustries from './AdminIndustries';
import AdminRentals from './AdminRentals';
import AdminMessages from './AdminMessages';
import AdminGallery from './AdminGallery';
import AdminTeam from './AdminTeam';
import AdminTestimonials from './AdminTestimonials';
import AdminSiteConfig from './AdminSiteConfig';

type SubTab = 'overview' | 'projects' | 'industries' | 'rentals' | 'messages' | 'gallery' | 'team' | 'testimonials' | 'config';

const AdminDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('overview');
  const { logout } = useAuth();

  const tabs: { id: SubTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'fa-chart-line' },
    { id: 'projects', label: 'Projets', icon: 'fa-helmet-safety' },
    { id: 'industries', label: 'Secteurs', icon: 'fa-microchip' },
    { id: 'rentals', label: 'Matériel', icon: 'fa-truck-pickup' },
    { id: 'messages', label: 'Messages', icon: 'fa-envelope' },
    { id: 'gallery', label: 'Galerie', icon: 'fa-images' },
    { id: 'team', label: 'Équipe', icon: 'fa-users' },
    { id: 'testimonials', label: 'Témoignages', icon: 'fa-quote-right' },
    { id: 'config', label: 'Configuration', icon: 'fa-gear' },
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case 'overview': return <AdminOverview />;
      case 'projects': return <AdminProjects />;
      case 'industries': return <AdminIndustries />;
      case 'rentals': return <AdminRentals />;
      case 'messages': return <AdminMessages />;
      case 'gallery': return <AdminGallery />;
      case 'team': return <AdminTeam />;
      case 'testimonials': return <AdminTestimonials />;
      case 'config': return <AdminSiteConfig />;
    }
  };

  return (
    <div className="pt-40 pb-32 bg-slate-50 min-h-screen animate-fadeIn">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 gap-6">
          <div>
            <h1 className="text-3xl font-black italic uppercase text-[#001E42]">Panneau de <span className="text-[#FFB81C]">Contrôle.</span></h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Gestion administrative de PI-CONSTRUCTION</p>
          </div>
          <button onClick={logout} className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 font-black uppercase text-[10px] rounded-lg hover:bg-red-600 hover:text-white transition-all">
            <i className="fas fa-right-from-bracket mr-2"></i>Déconnexion
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex flex-col space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-3 p-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all text-left ${
                  activeSubTab === tab.id ? 'bg-[#001E42] text-white' : 'bg-white text-slate-400 hover:bg-slate-50'
                }`}
              >
                <i className={`fas ${tab.icon} opacity-50 w-5`}></i>
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Content */}
          <div className="flex-grow bg-white p-10 rounded-2xl shadow-sm border border-slate-100 min-h-[600px]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
