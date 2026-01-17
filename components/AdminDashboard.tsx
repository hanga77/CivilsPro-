
import React, { useState } from 'react';
import { Project, ProjectStatus, GalleryItem, RentalItem } from '../types';

interface AdminDashboardProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  rentals: RentalItem[];
  setRentals: React.Dispatch<React.SetStateAction<RentalItem[]>>;
  logout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, setProjects, gallery, setGallery, rentals, setRentals, logout }) => {
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'gallery' | 'rentals'>('projects');
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<any>({
    name: '',
    budget: '',
    status: ProjectStatus.PLANNING,
    title: '',
    category: 'Bâtiment',
    price: '',
    desc: '',
    icon: 'fa-kaaba',
    url: ''
  });

  const handleDelete = (type: string, id: string) => {
    if (!confirm('Confirmer la suppression définitive ?')) return;
    if (type === 'projects') setProjects(prev => prev.filter(p => p.id !== id));
    if (type === 'gallery') setGallery(prev => prev.filter(p => p.id !== id));
    if (type === 'rentals') setRentals(prev => prev.filter(p => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();

    if (activeSubTab === 'projects') {
      const p: Project = {
        id,
        name: newItem.name,
        budget: Number(newItem.budget),
        status: newItem.status as ProjectStatus,
        client: 'Client Privé',
        location: 'Cameroun',
        progress: 0,
        startDate: new Date().toISOString().split('T')[0],
        thumbnail: newItem.url || 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800'
      };
      setProjects(prev => [...prev, p]);
    } else if (activeSubTab === 'gallery') {
      const g: GalleryItem = {
        id,
        title: newItem.title,
        category: newItem.category,
        url: newItem.url || 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800'
      };
      setGallery(prev => [...prev, g]);
    } else if (activeSubTab === 'rentals') {
      const r: RentalItem = {
        id,
        name: newItem.name,
        icon: newItem.icon,
        price: newItem.price,
        desc: newItem.desc
      };
      setRentals(prev => [...prev, r]);
    }

    setIsAdding(false);
    setNewItem({ name: '', budget: '', status: ProjectStatus.PLANNING, title: '', category: 'Bâtiment', price: '', desc: '', icon: 'fa-kaaba', url: '' });
  };

  return (
    <div className="p-12 max-w-7xl mx-auto animate-fadeIn pt-32 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div>
          <span className="text-blue-500 font-black tracking-[0.4em] text-[10px] uppercase mb-2 block">Système de Gestion Intégré</span>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">CONSOLE ADMIN.</h1>
          <div className="flex space-x-6 mt-6">
            {[
              { id: 'projects', label: 'Chantiers', icon: 'fa-helmet-safety' },
              { id: 'gallery', label: 'Galerie', icon: 'fa-images' },
              { id: 'rentals', label: 'Location', icon: 'fa-truck-ramp-box' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)} 
                className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest pb-3 border-b-2 transition-all ${activeSubTab === tab.id ? 'border-blue-600 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all">
            <i className="fas fa-plus mr-2"></i> AJOUTER {activeSubTab === 'projects' ? 'CHANTIER' : activeSubTab === 'gallery' ? 'IMAGE' : 'MATÉRIEL'}
          </button>
          <button onClick={logout} className="bg-slate-800 text-slate-400 border border-white/5 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
            <i className="fas fa-power-off mr-2"></i> SORTIR
          </button>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-xl shadow-2xl">
        {activeSubTab === 'projects' && (
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/5">
              <tr>
                <th className="px-10 py-6 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">Désignation Projet</th>
                <th className="px-10 py-6 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">Status Actuel</th>
                <th className="px-10 py-6 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">Budget (FCFA)</th>
                <th className="px-10 py-6 text-right text-[9px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-blue-600/5 transition-all">
                  <td className="px-10 py-6 text-sm font-bold text-white uppercase italic">{p.name}</td>
                  <td className="px-10 py-6">
                    <span className="bg-blue-600/10 text-blue-500 text-[10px] font-black px-3 py-1 rounded-md uppercase border border-blue-500/20">{p.status}</span>
                  </td>
                  <td className="px-10 py-6 text-sm font-black text-white">{p.budget.toLocaleString()}</td>
                  <td className="px-10 py-6 text-right">
                    <button onClick={() => handleDelete('projects', p.id)} className="text-slate-600 hover:text-red-500 transition-all"><i className="fas fa-trash-can"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSubTab === 'gallery' && (
          <div className="p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {gallery.map(item => (
              <div key={item.id} className="relative group rounded-3xl overflow-hidden aspect-square border border-white/10 shadow-lg">
                <img src={item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button onClick={() => handleDelete('gallery', item.id)} className="bg-red-500 text-white w-12 h-12 rounded-2xl shadow-xl hover:scale-110 transition-transform">
                     <i className="fas fa-trash-can"></i>
                   </button>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-slate-950">
                  <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest">{item.category}</p>
                  <p className="text-xs font-bold text-white uppercase italic truncate">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'rentals' && (
          <div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentals.map(item => (
              <div key={item.id} className="bg-slate-950/50 p-8 rounded-[2.5rem] border border-white/5 relative group">
                <button onClick={() => handleDelete('rentals', item.id)} className="absolute top-6 right-6 text-slate-700 hover:text-red-500 transition-all">
                  <i className="fas fa-trash-can text-sm"></i>
                </button>
                <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <i className={`fas ${item.icon} text-2xl`}></i>
                </div>
                <h4 className="text-xl font-black text-white uppercase italic mb-3">{item.name}</h4>
                <p className="text-slate-500 text-xs font-light mb-6 leading-relaxed italic">"{item.desc}"</p>
                <div className="text-blue-400 font-black tracking-widest uppercase text-xs">{item.price}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center z-[200] p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-white/10 rounded-[4rem] w-full max-w-2xl overflow-hidden shadow-3xl">
            <div className="p-10 bg-blue-600/10 border-b border-white/5 flex justify-between items-center">
              <div>
                <span className="text-blue-500 font-black text-[9px] uppercase tracking-[0.3em] block mb-2">Ajout de contenu</span>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Nouveau {activeSubTab === 'projects' ? 'Chantier' : activeSubTab === 'gallery' ? 'Réalisation' : 'Matériel'}</h2>
              </div>
              <button onClick={() => setIsAdding(false)} className="w-12 h-12 rounded-full bg-white/5 text-slate-400 hover:text-white transition-all flex items-center justify-center">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-12 space-y-8">
              {activeSubTab === 'projects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Intitulé du Projet</label>
                    <input required placeholder="ex: Construction Immeuble R+4" className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-blue-500 transition-all" onChange={e => setNewItem({...newItem, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Budget Global (FCFA)</label>
                    <input required type="number" placeholder="50000000" className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white font-black outline-none focus:border-blue-500" onChange={e => setNewItem({...newItem, budget: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Phase d'exécution</label>
                    <select className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white uppercase font-black text-[10px] outline-none" onChange={e => setNewItem({...newItem, status: e.target.value})}>
                      {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {activeSubTab === 'gallery' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Titre de la photo</label>
                      <input required placeholder="ex: Coulage de la dalle" className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white font-bold outline-none" onChange={e => setNewItem({...newItem, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Catégorie</label>
                      <select className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white uppercase font-black text-[10px]" onChange={e => setNewItem({...newItem, category: e.target.value})}>
                        <option value="Structure">Structure</option>
                        <option value="Bâtiment">Bâtiment</option>
                        <option value="Gros Œuvre">Gros Œuvre</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">URL de l'image (Lien direct)</label>
                    <input placeholder="https://..." className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white font-mono text-xs" onChange={e => setNewItem({...newItem, url: e.target.value})} />
                  </div>
                </div>
              )}

              {activeSubTab === 'rentals' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Désignation Matériel</label>
                    <input required placeholder="ex: Groupe Électrogène 50KVA" className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white font-bold" onChange={e => setNewItem({...newItem, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Tarification</label>
                    <input required placeholder="ex: 15 000 FCFA / Jour" className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white font-black" onChange={e => setNewItem({...newItem, price: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Icône FontAwesome</label>
                    <input placeholder="fa-bolt" className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white font-mono text-xs" onChange={e => setNewItem({...newItem, icon: e.target.value})} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Description technique</label>
                    <textarea placeholder="Détails du matériel..." className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white text-sm min-h-[100px]" onChange={e => setNewItem({...newItem, desc: e.target.value})}></textarea>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-blue-600/40 hover:bg-blue-500 transition-all hover:scale-[1.02] active:scale-95">
                ENREGISTRER DANS LA BASE DE DONNÉES
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
