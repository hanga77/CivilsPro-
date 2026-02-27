
import React, { useState } from 'react';
import { Project, ProjectStatus, GalleryItem, RentalItem, SiteConfig, ContactMessage, Industry } from '../types';

interface AdminDashboardProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  industries: Industry[];
  setIndustries: React.Dispatch<React.SetStateAction<Industry[]>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  rentals: RentalItem[];
  setRentals: React.Dispatch<React.SetStateAction<RentalItem[]>>;
  messages: ContactMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  logout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  projects, setProjects, industries, setIndustries, gallery, setGallery, rentals, setRentals, 
  messages, setMessages, config, setConfig, logout 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'industries' | 'rentals' | 'messages' | 'content' | 'settings'>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState<any>({});

  const handleDelete = (type: string, id: string) => {
    if (!confirm('Supprimer définitivement cet élément ?')) return;
    if (type === 'projects') setProjects(prev => prev.filter(p => p.id !== id));
    if (type === 'industries') setIndustries(prev => prev.filter(i => i.id !== id));
    if (type === 'rentals') setRentals(prev => prev.filter(p => p.id !== id));
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setNewItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSubTab === 'projects') {
      if (editingItem) {
        setProjects(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...newItem } : p));
      } else {
        setProjects(prev => [...prev, { ...newItem, id: Date.now().toString(), status: ProjectStatus.PLANNING, progress: 0, startDate: new Date().toISOString().split('T')[0] }]);
      }
    } else if (activeSubTab === 'industries') {
      if (editingItem) {
        setIndustries(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...newItem } : i));
      } else {
        setIndustries(prev => [...prev, { ...newItem, id: Date.now().toString() }]);
      }
    } else if (activeSubTab === 'rentals') {
      if (editingItem) {
        setRentals(prev => prev.map(r => r.id === editingItem.id ? { ...r, ...newItem } : r));
      } else {
        setRentals(prev => [...prev, { ...newItem, id: Date.now().toString() }]);
      }
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="w-full animate-fadeIn text-slate-900">
      {/* HEADER DASHBOARD */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 gap-6">
        <div>
          <h1 className="text-3xl font-black italic uppercase text-[#001E42]">Panneau de <span className="text-[#FFB81C]">Contrôle.</span></h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Gestion administrative de PI-CONSTRUCTION</p>
        </div>
        <div className="flex gap-4">
           {['projects', 'industries', 'rentals'].includes(activeSubTab) && (
             <button onClick={() => { setEditingItem(null); setNewItem({}); setIsModalOpen(true); }} className="px-6 py-3 bg-[#001E42] text-white font-black uppercase text-[10px] rounded-lg shadow-lg hover:bg-slate-800 transition-all">Ajouter</button>
           )}
           <button onClick={logout} className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 font-black uppercase text-[10px] rounded-lg hover:bg-red-600 hover:text-white transition-all">Déconnexion</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR NAVIGATION */}
        <aside className="lg:w-64 flex flex-col space-y-2">
          {[
            { id: 'projects', label: 'Projets', icon: 'fa-helmet-safety' },
            { id: 'industries', label: 'Secteurs (Industries)', icon: 'fa-microchip' },
            { id: 'rentals', label: 'Matériel', icon: 'fa-truck-pickup' },
            { id: 'messages', label: 'Messages', icon: 'fa-envelope', count: messages.filter(m => !m.isRead).length },
            { id: 'content', label: 'Textes du Site', icon: 'fa-file-lines' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center justify-between p-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeSubTab === tab.id ? 'bg-[#001E42] text-white' : 'bg-white text-slate-400 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <i className={`fas ${tab.icon} opacity-50`}></i>
                {tab.label}
              </div>
              {tab.count ? <span className="bg-[#FFB81C] text-[#001E42] px-2 py-0.5 rounded-full text-[8px]">{tab.count}</span> : null}
            </button>
          ))}
        </aside>

        {/* CONTENU VARIABLE */}
        <div className="flex-grow bg-white p-10 rounded-2xl shadow-sm border border-slate-100 min-h-[600px]">
          
          {/* GESTION DES TEXTES DU SITE */}
          {activeSubTab === 'content' && (
            <div className="space-y-8 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-400">Titre Principal (Hero)</label>
                  <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.slogan} onChange={e => setConfig({...config, slogan: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-400">Sous-Titre (Hero)</label>
                  <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.subSlogan} onChange={e => setConfig({...config, subSlogan: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-400">À propos (Footer)</label>
                <textarea rows={4} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.footerAbout} onChange={e => setConfig({...config, footerAbout: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-400">Stat: Projets</label>
                  <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.stats.projectsCount} onChange={e => setConfig({...config, stats: {...config.stats, projectsCount: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-400">Stat: Expérience</label>
                  <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.stats.expertiseYears} onChange={e => setConfig({...config, stats: {...config.stats, expertiseYears: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-400">Stat: Experts</label>
                  <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.stats.teamSize} onChange={e => setConfig({...config, stats: {...config.stats, teamSize: e.target.value}})} />
                </div>
              </div>
            </div>
          )}

          {/* LISTE DES MESSAGES */}
          {activeSubTab === 'messages' && (
            <div className="space-y-4">
               {messages.length === 0 && <p className="text-center py-20 text-slate-400 font-bold italic">Aucun message pour le moment.</p>}
               {messages.map(m => (
                 <div key={m.id} className={`p-6 rounded-2xl border ${m.isRead ? 'bg-slate-50 border-slate-100' : 'bg-white border-[#FFB81C] shadow-sm'}`}>
                    <div className="flex justify-between items-start mb-3">
                       <div>
                          <p className="font-black text-[#001E42] uppercase text-sm">{m.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{m.email} • {m.date}</p>
                       </div>
                       <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-slate-100 rounded-full text-[8px] font-black text-slate-500 uppercase">{m.subject}</span>
                        {!m.isRead && <button onClick={() => setMessages(prev => prev.map(msg => msg.id === m.id ? {...msg, isRead: true} : msg))} className="text-[8px] font-black text-[#FFB81C] uppercase underline">Marquer Lu</button>}
                       </div>
                    </div>
                    <p className="text-slate-600 text-sm italic">"{m.message}"</p>
                 </div>
               ))}
            </div>
          )}

          {/* LISTES DYNAMIQUES */}
          {(['projects', 'industries', 'rentals'].includes(activeSubTab)) && (
            <div className="grid grid-cols-1 gap-4">
              {(activeSubTab === 'projects' ? projects : activeSubTab === 'industries' ? industries : rentals).map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden">
                        <img src={item.thumbnail || item.imageUrl || 'https://via.placeholder.com/100'} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-xs text-[#001E42] uppercase">{item.name || item.title}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">{item.location || item.price || (item.description?.substring(0, 30) + '...')}</p>
                      </div>
                   </div>
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleEdit(item)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 hover:text-[#001E42]"><i className="fas fa-pen text-[10px]"></i></button>
                      <button onClick={() => handleDelete(activeSubTab, item.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-lg shadow-sm border border-red-100 text-red-500 hover:bg-red-500 hover:text-white"><i className="fas fa-trash text-[10px]"></i></button>
                   </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* MODAL AJOUT / MODIF */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#001E42]/90 backdrop-blur-md">
           <form onSubmit={handleSave} className="bg-white p-10 rounded-2xl w-full max-w-xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-black text-[#001E42] italic uppercase border-l-4 border-[#FFB81C] pl-4">Edition : {activeSubTab}</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Titre / Nom</label>
                  <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={newItem.name || newItem.title || ''} onChange={e => setNewItem({...newItem, [activeSubTab === 'industries' ? 'title' : 'name']: e.target.value})} required />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">URL Image / Miniature</label>
                  <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={newItem.thumbnail || newItem.imageUrl || ''} onChange={e => setNewItem({...newItem, [activeSubTab === 'industries' ? 'imageUrl' : 'thumbnail']: e.target.value})} required />
                </div>

                {activeSubTab === 'industries' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Classe d'icône FontAwesome (ex: fa-road)</label>
                      <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={newItem.icon || ''} onChange={e => setNewItem({...newItem, icon: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Description Détaillée</label>
                      <textarea rows={4} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={newItem.description || ''} onChange={e => setNewItem({...newItem, description: e.target.value})}></textarea>
                    </div>
                  </>
                )}

                {activeSubTab === 'projects' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Budget (FCFA)</label>
                      <input type="number" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={newItem.budget || ''} onChange={e => setNewItem({...newItem, budget: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Lieu</label>
                      <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={newItem.location || ''} onChange={e => setNewItem({...newItem, location: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Client</label>
                      <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={newItem.client || ''} onChange={e => setNewItem({...newItem, client: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Secteur</label>
                      <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={newItem.sector || ''} onChange={e => setNewItem({...newItem, sector: e.target.value})} />
                    </div>
                  </div>
                )}

                {activeSubTab === 'rentals' && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase">Prix par Jour / Voyage</label>
                    <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={newItem.price || ''} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                  </div>
                )}
              </div>
              <div className="flex gap-4 pt-4">
                 <button type="submit" className="flex-grow py-4 bg-[#FFB81C] text-[#001E42] font-black uppercase text-xs rounded-xl shadow-lg">Enregistrer</button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-4 bg-slate-100 text-slate-500 font-black uppercase text-xs rounded-xl">Annuler</button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
