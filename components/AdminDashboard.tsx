
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
    name: '', budget: '', status: ProjectStatus.PLANNING, title: '', category: 'Ingénierie', price: '', desc: '', icon: 'fa-kaaba', url: ''
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
    setNewItem({ name: '', budget: '', status: ProjectStatus.PLANNING, title: '', category: 'Ingénierie', price: '', desc: '', icon: 'fa-kaaba', url: '' });
  };

  return (
    <div className="p-12 max-w-7xl mx-auto animate-fadeIn pt-32 min-h-screen">
      {isAdding && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsAdding(false)}></div>
          <form onSubmit={handleSubmit} className="relative bg-slate-900 border border-white/10 p-12 rounded-[3rem] w-full max-w-2xl shadow-3xl">
            <h3 className="text-2xl font-black text-white italic uppercase mb-8">Nouveau contenu {activeSubTab}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeSubTab === 'gallery' ? (
                <>
                  <input placeholder="Titre de l'image" className="bg-slate-950 p-4 rounded-xl text-white" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} required />
                  <select className="bg-slate-950 p-4 rounded-xl text-white" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                    <option>Ingénierie</option>
                    <option>Matériel</option>
                    <option>Chantier</option>
                  </select>
                  <input placeholder="URL de l'image (Unsplash ou autre)" className="md:col-span-2 bg-slate-950 p-4 rounded-xl text-white font-mono text-xs" value={newItem.url} onChange={e => setNewItem({...newItem, url: e.target.value})} required />
                </>
              ) : activeSubTab === 'projects' ? (
                <>
                  <input placeholder="Nom du projet" className="bg-slate-950 p-4 rounded-xl text-white" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
                  <input placeholder="Budget" type="number" className="bg-slate-950 p-4 rounded-xl text-white" value={newItem.budget} onChange={e => setNewItem({...newItem, budget: e.target.value})} required />
                  <input placeholder="URL Photo" className="md:col-span-2 bg-slate-950 p-4 rounded-xl text-white" value={newItem.url} onChange={e => setNewItem({...newItem, url: e.target.value})} />
                </>
              ) : (
                <>
                  <input placeholder="Nom matériel" className="bg-slate-950 p-4 rounded-xl text-white" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
                  <input placeholder="Prix/Tarif" className="bg-slate-950 p-4 rounded-xl text-white" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                  <textarea placeholder="Description courte" className="md:col-span-2 bg-slate-950 p-4 rounded-xl text-white" value={newItem.desc} onChange={e => setNewItem({...newItem, desc: e.target.value})} />
                </>
              )}
            </div>
            <div className="flex space-x-4 mt-10">
              <button type="submit" className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-950" style={{ backgroundColor: config.accentColor }}>ENREGISTRER</button>
              <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-slate-800 text-white">ANNULER</button>
            </div>
          </form>
        </div>
      )}

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
                </div>
              </div>
              <div className="space-y-8">
                <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/10 pb-4">Footer & Social</h3>
                <div className="space-y-6">
                  <textarea name="footerAbout" value={config.footerAbout} onChange={handleConfigChange} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white min-h-[100px]" />
                  <input placeholder="WhatsApp" name="social_whatsapp" value={config.socialLinks.whatsapp} onChange={handleConfigChange} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-xs" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSubTab === 'gallery' && (
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {gallery.map(item => (
                <div key={item.id} className="relative group rounded-2xl overflow-hidden aspect-square border border-white/5">
                  <img src={item.url} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4">
                    <p className="text-[8px] font-black text-white uppercase text-center mb-4">{item.title}</p>
                    <button onClick={() => handleDelete('gallery', item.id)} className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center"><i className="fas fa-trash"></i></button>
                  </div>
                </div>
              ))}
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
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id} className="border-t border-white/5 text-sm">
                    <td className="p-4 font-bold text-white uppercase italic">{p.name}</td>
                    <td className="p-4 text-xs font-black" style={{ color: config.accentColor }}>{p.status}</td>
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
