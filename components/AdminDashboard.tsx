
import React, { useState } from 'react';
import { Project, ProjectStatus, GalleryItem, RentalItem, SiteConfig, ContactMessage } from '../types';
import { generateSiteSummary } from '../services/geminiService';

interface AdminDashboardProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
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
  projects, setProjects, gallery, setGallery, rentals, setRentals, 
  messages, setMessages, config, setConfig, logout 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'gallery' | 'rentals' | 'messages' | 'settings'>('projects');
  
  // États pour la création/édition
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState<any>({});

  const stats = {
    totalBudget: projects.reduce((acc, p) => acc + p.budget, 0),
    activeCount: projects.length,
    unreadMessages: messages.filter(m => !m.isRead).length
  };

  const handleDelete = (type: string, id: string) => {
    if (!confirm('Supprimer définitivement ?')) return;
    if (type === 'projects') setProjects(prev => prev.filter(p => p.id !== id));
    if (type === 'gallery') setGallery(prev => prev.filter(p => p.id !== id));
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
        setProjects(prev => [...prev, { ...newItem, id: Date.now().toString(), status: ProjectStatus.PLANNING, progress: 0 }]);
      }
    } else if (activeSubTab === 'gallery') {
      if (editingItem) {
        setGallery(prev => prev.map(g => g.id === editingItem.id ? { ...g, ...newItem } : g));
      } else {
        setGallery(prev => [...prev, { ...newItem, id: Date.now().toString() }]);
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
    <div className="w-full animate-fadeIn">
      {/* HEADER DASHBOARD */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black italic uppercase text-white">Station <span style={{ color: config.accentColor }}>Commandement.</span></h1>
        <div className="flex gap-4">
           {activeSubTab !== 'messages' && activeSubTab !== 'settings' && (
             <button onClick={() => { setEditingItem(null); setNewItem({}); setIsModalOpen(true); }} className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] rounded-xl">Ajouter Élément</button>
           )}
           <button onClick={logout} className="px-8 py-3 bg-red-500/10 text-red-500 border border-red-500/20 font-black uppercase text-[10px] rounded-xl">Quitter</button>
        </div>
      </div>

      {/* STATS RAPIDES */}
      <div className="grid grid-cols-3 gap-6 mb-12">
         <div className="bg-slate-900 p-6 rounded-3xl border border-white/5">
            <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Budget Total</p>
            <p className="text-2xl font-black text-white italic">{(stats.totalBudget/1000000).toFixed(1)}M FCFA</p>
         </div>
         <div className="bg-slate-900 p-6 rounded-3xl border border-white/5">
            <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Projets</p>
            <p className="text-2xl font-black text-white italic">{stats.activeCount}</p>
         </div>
         <div className="bg-slate-900 p-6 rounded-3xl border border-white/5">
            <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Messages</p>
            <p className="text-2xl font-black text-white italic">{stats.unreadMessages}</p>
         </div>
      </div>

      {/* TABS ADMIN */}
      <div className="flex space-x-10 border-b border-white/5 mb-10 overflow-x-auto no-scrollbar">
        {['projects', 'gallery', 'rentals', 'messages', 'settings'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveSubTab(tab as any)} 
            className={`pb-4 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSubTab === tab ? 'text-white border-white' : 'text-slate-500 border-transparent'}`}
            style={activeSubTab === tab ? { color: config.accentColor, borderColor: config.accentColor } : {}}
          >
            {tab === 'rentals' ? 'Location' : tab === 'settings' ? 'Système' : tab}
          </button>
        ))}
      </div>

      {/* CONTENU VARIABLE */}
      <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5">
        
        {/* REGLAGES SYSTEME (Logo, Banner, etc) */}
        {activeSubTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
             <div className="space-y-6">
                <h3 className="text-xl font-black text-white italic uppercase">Identité Visuelle</h3>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black text-slate-500">URL du Logo</label>
                   <input className="w-full bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={config.logoUrl} onChange={e => setConfig({...config, logoUrl: e.target.value})} />
                   <div className="mt-4 p-4 bg-white/5 rounded-2xl flex items-center justify-center">
                      <img src={config.logoUrl} className="h-16 object-contain" alt="Logo Preview" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black text-slate-500">Image de Bannière (Hero)</label>
                   <input className="w-full bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={config.heroImage} onChange={e => setConfig({...config, heroImage: e.target.value})} />
                   <img src={config.heroImage} className="mt-4 h-32 w-full object-cover rounded-2xl border border-white/5" />
                </div>
             </div>
             
             <div className="space-y-6">
                <h3 className="text-xl font-black text-white italic uppercase">Informations Plateforme</h3>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black text-slate-500">Nom Entreprise</label>
                   <input className="w-full bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={config.companyName} onChange={e => setConfig({...config, companyName: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black text-slate-500">Slogan Principal</label>
                   <input className="w-full bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={config.slogan} onChange={e => setConfig({...config, slogan: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black text-slate-500">Couleur Accent (HEX)</label>
                   <div className="flex gap-4">
                      <input className="flex-grow bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={config.accentColor} onChange={e => setConfig({...config, accentColor: e.target.value})} />
                      <div className="w-14 rounded-xl shadow-lg" style={{ backgroundColor: config.accentColor }}></div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* LISTES DE GESTION (Projets, Galerie, Location) */}
        {(activeSubTab === 'projects' || activeSubTab === 'gallery' || activeSubTab === 'rentals') && (
           <div className="space-y-6">
              {(activeSubTab === 'projects' ? projects : activeSubTab === 'gallery' ? gallery : rentals).map((item: any) => (
                <div key={item.id} className="bg-slate-950/60 p-6 rounded-3xl border border-white/5 flex items-center justify-between group">
                   <div className="flex items-center gap-6">
                      <img src={item.thumbnail || item.url || 'https://via.placeholder.com/100'} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                         <p className="text-white font-black uppercase italic">{item.name || item.title}</p>
                         <p className="text-[10px] text-slate-500 font-mono">{item.location || item.category || item.price}</p>
                      </div>
                   </div>
                   <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(item)} className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white"><i className="fas fa-pen-to-square"></i></button>
                      <button onClick={() => handleDelete(activeSubTab, item.id)} className="p-3 bg-red-500/10 rounded-xl text-red-500"><i className="fas fa-trash"></i></button>
                   </div>
                </div>
              ))}
           </div>
        )}

        {/* MESSAGES */}
        {activeSubTab === 'messages' && (
           <div className="space-y-6">
              {messages.map(m => (
                <div key={m.id} className="bg-slate-950/60 p-6 rounded-3xl border border-white/5">
                   <div className="flex justify-between mb-4">
                      <p className="text-white font-black uppercase">{m.name}</p>
                      <span className="text-[10px] text-slate-500">{m.date}</span>
                   </div>
                   <p className="text-slate-400 italic">"{m.message}"</p>
                </div>
              ))}
           </div>
        )}
      </div>

      {/* MODAL EDIT/ADD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md">
           <form onSubmit={handleSave} className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-xl space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">{editingItem ? 'Modifier' : 'Ajouter'} {activeSubTab}</h3>
              
              <div className="grid grid-cols-1 gap-4">
                 <input placeholder="Titre / Nom" required className="bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={newItem.name || newItem.title || ''} onChange={e => activeSubTab === 'projects' ? setNewItem({...newItem, name: e.target.value}) : setNewItem({...newItem, title: e.target.value})} />
                 <input placeholder="Image URL" required className="bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={newItem.thumbnail || newItem.url || ''} onChange={e => activeSubTab === 'projects' ? setNewItem({...newItem, thumbnail: e.target.value}) : setNewItem({...newItem, url: e.target.value})} />
                 
                 {activeSubTab === 'projects' && (
                   <>
                    <input placeholder="Lieu" className="bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={newItem.location || ''} onChange={e => setNewItem({...newItem, location: e.target.value})} />
                    <input placeholder="Budget (Nombre)" type="number" className="bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={newItem.budget || ''} onChange={e => setNewItem({...newItem, budget: Number(e.target.value)})} />
                   </>
                 )}
                 
                 {activeSubTab === 'rentals' && (
                   <input placeholder="Prix (ex: 50.000 FCFA)" className="bg-slate-950 p-4 rounded-xl text-white border border-white/5" value={newItem.price || ''} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                 )}
              </div>

              <div className="flex gap-4">
                 <button type="submit" className="flex-grow py-5 bg-white text-black font-black uppercase rounded-2xl tracking-widest">Enregistrer</button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-5 bg-slate-800 text-white font-black uppercase rounded-2xl tracking-widest">Annuler</button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
