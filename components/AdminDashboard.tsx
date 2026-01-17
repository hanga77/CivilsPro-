
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, setProjects, gallery, setGallery, rentals, setRentals, messages, setMessages, config, setConfig, logout }) => {
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'gallery' | 'rentals' | 'messages' | 'settings'>('projects');
  const [isAdding, setIsAdding] = useState(false);
  const [generatingReportId, setGeneratingReportId] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<{ id: string, text: string } | null>(null);
  
  const [newItem, setNewItem] = useState<any>({
    name: '', budget: '', title: '', category: 'Ingénierie', price: 'Sur Devis', desc: '', icon: 'fa-kaaba', url: ''
  });

  const stats = {
    totalBudget: projects.reduce((acc, p) => acc + p.budget, 0),
    activeProjects: projects.filter(p => p.status === ProjectStatus.IN_PROGRESS).length,
    unreadMessages: messages.filter(m => !m.isRead).length,
    itemsCount: gallery.length + rentals.length
  };

  const handleAiReport = async (project: Project) => {
    setGeneratingReportId(project.id);
    const dataString = `Projet: ${project.name}, Client: ${project.client}, Budget: ${project.budget} FCFA, Progrès: ${project.progress}%, Statut: ${project.status}`;
    const report = await generateSiteSummary(dataString);
    setAiReport({ id: project.id, text: report });
    setGeneratingReportId(null);
  };

  const handleDelete = (type: string, id: string) => {
    if (!confirm('Confirmer la suppression ?')) return;
    if (type === 'projects') setProjects(prev => prev.filter(p => p.id !== id));
    if (type === 'gallery') setGallery(prev => prev.filter(p => p.id !== id));
    if (type === 'rentals') setRentals(prev => prev.filter(p => p.id !== id));
    if (type === 'messages') setMessages(prev => prev.filter(m => m.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    if (activeSubTab === 'projects') {
      setProjects(prev => [...prev, { 
        id, 
        name: newItem.name || 'Nouveau Projet', 
        budget: Number(newItem.budget) || 0, 
        status: ProjectStatus.PLANNING, 
        progress: 0, 
        startDate: new Date().toISOString(), 
        thumbnail: newItem.url || 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5', 
        location: 'Cameroun', 
        client: 'Client Privé' 
      }]);
    } else if (activeSubTab === 'gallery') {
      setGallery(prev => [...prev, { id, title: newItem.title || 'Sans titre', category: newItem.category, url: newItem.url }]);
    } else if (activeSubTab === 'rentals') {
      setRentals(prev => [...prev, { id, name: newItem.name, icon: newItem.icon, price: newItem.price, desc: newItem.desc }]);
    }
    setIsAdding(false);
    setNewItem({ name: '', budget: '', title: '', category: 'Ingénierie', price: 'Sur Devis', desc: '', icon: 'fa-kaaba', url: '' });
  };

  return (
    <div className="w-full animate-fadeIn min-h-screen">
      {/* KPIs Grid - 2 cols mobile, 4 cols desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
        {[
          { label: "Budgets", val: `${(stats.totalBudget / 1000000).toFixed(1)}M`, icon: "fa-sack-dollar", color: config.accentColor },
          { label: "Messages", val: stats.unreadMessages, icon: "fa-envelope-open-text", color: "#3b82f6" },
          { label: "En cours", val: stats.activeProjects, icon: "fa-person-digging", color: "#10b981" },
          { label: "Actifs Site", val: stats.itemsCount, icon: "fa-layer-group", color: "#8b5cf6" }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/60 border border-white/5 p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <i className={`fas ${stat.icon} text-sm md:text-lg`} style={{ color: stat.color }}></i>
              <span className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-tighter">{stat.label}</span>
            </div>
            <p className="text-xl md:text-3xl font-black text-white italic">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10 gap-6">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter italic uppercase text-center md:text-left">ADMIN<span style={{ color: config.accentColor }}>ISTRATION.</span></h1>
        <div className="flex w-full md:w-auto gap-3">
          {activeSubTab !== 'messages' && activeSubTab !== 'settings' && (
            <button onClick={() => setIsAdding(true)} className="flex-1 md:flex-none bg-white text-black px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-105 transition-transform">AJOUTER</button>
          )}
          <button onClick={logout} className="flex-1 md:flex-none bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest">QUITTER</button>
        </div>
      </div>

      {/* Tabs Menu Responsive Scroll */}
      <div className="flex overflow-x-auto pb-4 mb-6 md:mb-8 space-x-6 md:space-x-8 no-scrollbar border-b border-white/5">
        {[
          { id: 'projects', label: 'Projets BTP' },
          { id: 'gallery', label: 'Galerie Photos' },
          { id: 'rentals', label: 'Catalogue' },
          { id: 'messages', label: 'Messages' },
          { id: 'settings', label: 'Réglages' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)} 
            className={`whitespace-nowrap text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] pb-3 border-b-2 transition-all ${activeSubTab === tab.id ? 'text-white border-white' : 'border-transparent text-slate-500'}`}
            style={activeSubTab === tab.id ? { color: config.accentColor, borderColor: config.accentColor } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/40 rounded-2xl md:rounded-[2.5rem] border border-white/5 overflow-hidden p-4 md:p-10">
        {activeSubTab === 'projects' && (
          <div className="space-y-4 md:space-y-6">
            {projects.length === 0 && <p className="text-slate-500 text-center italic py-20">Aucun projet enregistré.</p>}
            {projects.map(p => (
              <div key={p.id} className="bg-slate-950/60 border border-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl flex flex-col lg:flex-row gap-4 md:gap-8 items-center">
                <div className="w-full lg:w-40 h-32 md:h-40 lg:h-32 shrink-0">
                  <img src={p.thumbnail} className="w-full h-full object-cover rounded-xl border border-white/10" alt={p.name} />
                </div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg md:text-xl font-black text-white italic uppercase truncate max-w-[200px] md:max-w-none">{p.name}</h3>
                    <span className="text-[7px] md:text-[9px] font-black bg-white/5 px-2 md:px-3 py-1 rounded-full text-slate-400 uppercase border border-white/5">{p.status}</span>
                  </div>
                  <p className="text-[8px] md:text-[10px] text-slate-500 mb-4 md:mb-6 uppercase font-bold tracking-widest">{p.client} • {p.budget.toLocaleString()} FCFA</p>
                  
                  {aiReport?.id === p.id && (
                    <div className="mb-4 md:mb-6 p-4 md:p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl md:rounded-2xl animate-fadeIn">
                      <p className="text-[8px] md:text-[10px] font-black text-blue-400 uppercase mb-2">Synthèse IA Gemini</p>
                      <p className="text-[11px] text-slate-300 italic">{aiReport.text}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <button onClick={() => handleAiReport(p)} disabled={generatingReportId === p.id} className="flex-1 md:flex-none text-[8px] md:text-[9px] font-black bg-white/5 border border-white/10 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-white hover:bg-white/10 flex items-center justify-center gap-2 uppercase">
                      <i className={`fas ${generatingReportId === p.id ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                      IA
                    </button>
                    <button onClick={() => handleDelete('projects', p.id)} className="flex-1 md:flex-none text-[8px] md:text-[9px] font-black bg-red-500/10 text-red-500 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl border border-red-500/20 uppercase">Supprimer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ... Autres rubriques optimisées similairement ... */}
        {activeSubTab === 'gallery' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {gallery.map(item => (
              <div key={item.id} className="bg-slate-950/60 rounded-2xl overflow-hidden border border-white/5 group">
                <div className="relative aspect-video">
                  <img src={item.url} className="w-full h-full object-cover" alt={item.title} />
                  <button onClick={() => handleDelete('gallery', item.id)} className="absolute top-2 right-2 bg-red-600/80 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-trash-can text-[10px]"></i>
                  </button>
                </div>
                <div className="p-3 md:p-5">
                  <p className="text-white font-bold uppercase italic text-[10px] md:text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 && <p className="text-slate-500 text-center italic py-10">Aucun message.</p>}
            {messages.map(m => (
              <div key={m.id} className="bg-slate-950/60 p-4 md:p-6 rounded-2xl border border-white/5">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                  <div>
                    <p className="text-white font-black uppercase text-[11px] md:text-sm">{m.name}</p>
                    <p className="text-[9px] text-blue-500 font-mono italic truncate">{m.email}</p>
                  </div>
                  <span className="text-[7px] text-slate-500 font-black uppercase">{m.date}</span>
                </div>
                <p className="text-slate-400 text-[11px] italic leading-relaxed mb-4">"{m.message}"</p>
                <button onClick={() => handleDelete('messages', m.id)} className="text-[8px] font-black text-red-500/60 uppercase">Archiver</button>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'settings' && (
          <div className="max-w-2xl space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1">
                <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Nom Entreprise</label>
                <input className="w-full bg-slate-950 p-4 rounded-xl text-white text-xs border border-white/5" value={config.companyName} onChange={e => setConfig({...config, companyName: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Couleur (Hex)</label>
                <input className="w-full bg-slate-950 p-4 rounded-xl text-white text-xs border border-white/5" value={config.accentColor} onChange={e => setConfig({...config, accentColor: e.target.value})} />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Slogan</label>
                <input className="w-full bg-slate-950 p-4 rounded-xl text-white text-xs border border-white/5" value={config.slogan} onChange={e => setConfig({...config, slogan: e.target.value})} />
              </div>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
               <p className="text-[9px] font-black text-green-500 uppercase mb-1">Système</p>
               <p className="text-[10px] text-slate-400 italic">Modifications immédiates.</p>
            </div>
          </div>
        )}
      </div>

      {/* Adding Modal - Fixed Responsive Padding */}
      {isAdding && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] w-full max-w-lg shadow-3xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl md:text-2xl font-black text-white italic uppercase mb-6 md:mb-8">Nouveau {activeSubTab === 'projects' ? 'Projet' : 'Média'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <input placeholder="Nom / Titre" required className="w-full bg-slate-950 p-4 md:p-5 rounded-xl md:rounded-2xl text-white text-sm border border-white/5" value={newItem.name || newItem.title} onChange={e => activeSubTab === 'projects' ? setNewItem({...newItem, name: e.target.value}) : setNewItem({...newItem, title: e.target.value})} />
              <input placeholder="URL Image" required className="w-full bg-slate-950 p-4 md:p-5 rounded-xl md:rounded-2xl text-white text-sm border border-white/5" value={newItem.url} onChange={e => setNewItem({...newItem, url: e.target.value})} />
              <div className="flex gap-3 md:gap-4 pt-4">
                <button type="submit" className="flex-1 py-4 md:py-5 bg-white text-black font-black text-[9px] md:text-[10px] uppercase rounded-xl md:rounded-2xl tracking-widest">OK</button>
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-4 md:py-5 bg-slate-800 text-white font-black text-[9px] md:text-[10px] uppercase rounded-xl md:rounded-2xl tracking-widest">ANNULER</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
