
import React, { useState } from 'react';
import { Project, ProjectStatus, GalleryItem, RentalItem, SiteConfig } from '../types';

interface AdminDashboardProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  rentals: RentalItem[];
  setRentals: React.Dispatch<React.SetStateAction<RentalItem[]>>;
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  logout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, setProjects, gallery, setGallery, rentals, setRentals, config, setConfig, logout }) => {
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'gallery' | 'rentals' | 'settings'>('projects');
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<any>({
    name: '', budget: '', status: ProjectStatus.PLANNING, title: '', category: 'Bâtiment', price: '', desc: '', icon: 'fa-kaaba', url: ''
  });

  const handleDelete = (type: string, id: string) => {
    if (!confirm('Action irréversible. Confirmer la suppression ?')) return;
    if (type === 'projects') setProjects(prev => prev.filter(p => p.id !== id));
    if (type === 'gallery') setGallery(prev => prev.filter(p => p.id !== id));
    if (type === 'rentals') setRentals(prev => prev.filter(p => p.id !== id));
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const key = name.replace('social_', '');
      setConfig(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));
    } else if (name === 'contactPhones') {
      setConfig(prev => ({ ...prev, contactPhones: value.split(',').map(s => s.trim()) }));
    } else {
      setConfig(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    if (activeSubTab === 'projects') {
      setProjects(prev => [...prev, { ...newItem, id, budget: Number(newItem.budget), progress: 0, startDate: new Date().toISOString(), thumbnail: newItem.url || 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5' }]);
    } else if (activeSubTab === 'gallery') {
      setGallery(prev => [...prev, { id, title: newItem.title, category: newItem.category, url: newItem.url }]);
    } else if (activeSubTab === 'rentals') {
      setRentals(prev => [...prev, { id, name: newItem.name, icon: newItem.icon, price: newItem.price, desc: newItem.desc }]);
    }
    setIsAdding(false);
  };

  return (
    <div className="p-12 max-w-7xl mx-auto animate-fadeIn pt-32 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div>
          <span className="font-black tracking-[0.4em] text-[10px] uppercase mb-2 block" style={{ color: config.accentColor }}>Administration Système</span>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">PI-CONSOLE Master.</h1>
          <div className="flex flex-wrap gap-6 mt-6">
            {['projects', 'gallery', 'rentals', 'settings'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveSubTab(tab as any)} 
                className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest pb-3 border-b-2 transition-all ${activeSubTab === tab ? 'text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                style={activeSubTab === tab ? { borderColor: config.accentColor } : {}}
              >
                <span>{tab === 'settings' ? 'Branding & Footer' : tab.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          {activeSubTab !== 'settings' && (
            <button onClick={() => setIsAdding(true)} className="text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl" style={{ backgroundColor: config.accentColor }}>
              AJOUTER
            </button>
          )}
          <button onClick={logout} className="bg-slate-800 text-slate-400 border border-white/5 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
            QUITTER
          </button>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-xl shadow-2xl">
        {activeSubTab === 'settings' && (
          <div className="p-12 space-y-16 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/10 pb-4">Identité Visuelle</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] text-slate-500 uppercase font-black">Nom Principal</label>
                      <input name="companyName" value={config.companyName} onChange={handleConfigChange} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] text-slate-500 uppercase font-black">Statut Juridique</label>
                      <input name="companySuffix" value={config.companySuffix} onChange={handleConfigChange} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] text-slate-500 uppercase font-black">Slogan Technique</label>
                    <input name="slogan" value={config.slogan} onChange={handleConfigChange} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] text-slate-500 uppercase font-black">Couleur d'accent (HEX)</label>
                    <div className="flex gap-4">
                      <input type="color" name="accentColor" value={config.accentColor} onChange={handleConfigChange} className="w-16 h-12 rounded-lg bg-transparent border-none" />
                      <input name="accentColor" value={config.accentColor} onChange={handleConfigChange} className="flex-1 bg-slate-950 border border-white/5 rounded-xl p-4 text-white font-mono" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/10 pb-4">Footer & Social</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] text-slate-500 uppercase font-black">Présentation Pied de page</label>
                    <textarea name="footerAbout" value={config.footerAbout} onChange={handleConfigChange} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white min-h-[100px]" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <input placeholder="WhatsApp (ex: +237...)" name="social_whatsapp" value={config.socialLinks.whatsapp} onChange={handleConfigChange} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-xs" />
                    <input placeholder="Facebook URL" name="social_facebook" value={config.socialLinks.facebook} onChange={handleConfigChange} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-xs" />
                    <input placeholder="LinkedIn URL" name="social_linkedin" value={config.socialLinks.linkedin} onChange={handleConfigChange} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSubTab === 'projects' && (
          <div className="p-8">
            <table className="min-w-full">
              <thead>
                <tr className="text-[9px] font-black uppercase tracking-widest text-slate-500 text-left">
                  <th className="p-4">Désignation</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id} className="border-t border-white/5 text-sm">
                    <td className="p-4 font-bold text-white uppercase italic">{p.name}</td>
                    <td className="p-4 text-xs font-black" style={{ color: config.accentColor }}>{p.status}</td>
                    <td className="p-4 font-black">{p.budget.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete('projects', p.id)} className="text-red-500 opacity-50 hover:opacity-100"><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
