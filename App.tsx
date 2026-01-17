
import React, { useState, useCallback, useMemo } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import { Project, GalleryItem, RentalItem } from './types';
import { INITIAL_PROJECTS } from './constants';

const App: React.FC = () => {
  // Navigation
  const [activeTab, setActiveTab] = useState('home');
  
  // États de données
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { id: '1', category: 'Structure', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800', title: 'Fondations Spéciales' },
    { id: '2', category: 'Bâtiment', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', title: 'Villa R+1 Finitions' },
    { id: '3', category: 'Gros Œuvre', url: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800', title: 'Édifice Commercial' },
  ]);

  const [rentalItems, setRentalItems] = useState<RentalItem[]>([
    { id: '1', name: "Échafaudages Métalliques", icon: "fa-kaaba", price: "Sur Devis", desc: "Matériel robuste disponible à Douala." },
    { id: '2', name: "Étais Métalliques", icon: "fa-grip-lines-vertical", price: "Prix/Jour", desc: "Réglage de précision pour gros œuvre." },
    { id: '3', name: "Bétonnière Malaxeur", icon: "fa-truck-pickup", price: "Avec Pompe", desc: "Coulage efficace partout au Cameroun." }
  ]);

  // États UI
  const [galleryFilter, setGalleryFilter] = useState('Tous');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Handlers mémoïsés
  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'admin@pi-construction.com' && loginForm.password === 'admin') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Identifiants incorrects');
    }
  }, [loginForm]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setActiveTab('home');
    setLoginForm({ email: '', password: '' });
  }, []);

  const filteredGallery = useMemo(() => {
    return galleryFilter === 'Tous' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === galleryFilter);
  }, [galleryFilter, galleryItems]);

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      isAdmin={isLoggedIn} 
      setIsAdmin={setIsLoggedIn}
    >
      <div className="pt-28 pb-20">
        {activeTab === 'home' && (
          <div className="px-6 animate-fadeIn">
            <div className="max-w-7xl mx-auto h-[500px] md:h-[650px] rounded-[3.5rem] overflow-hidden relative shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070" 
                className="w-full h-full object-cover grayscale brightness-[0.3]" 
                alt="Chantier PI-BTP" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/60 to-transparent flex items-center px-10 md:px-24">
                <div className="max-w-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="h-[2px] w-12 bg-blue-600"></span>
                    <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em]">Expertise Camerounaise</span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8">
                    BATIR <br/><span className="text-blue-600">L'AVENIR.</span>
                  </h1>
                  <p className="text-slate-400 text-lg md:text-xl font-light mb-12 leading-relaxed">
                    PI-CONSTRUCTION BTP SARL : Votre partenaire de confiance pour le génie civil, le bâtiment et la maintenance industrielle.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button 
                      onClick={() => setActiveTab('projects')} 
                      className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-500 hover:scale-105 transition-all shadow-xl shadow-blue-600/30"
                    >
                      DÉCOUVRIR NOS PROJETS
                    </button>
                    <button 
                      onClick={() => setActiveTab('rentals')} 
                      className="bg-white/5 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all"
                    >
                      NOS SERVICES
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
            <div className="mb-16">
              <h2 className="text-5xl font-black text-white italic uppercase tracking-tight mb-4">Projets en cours</h2>
              <p className="text-slate-500 font-medium">Suivi temps-réel de nos interventions majeures.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map(p => (
                <div key={p.id} className="bg-slate-900/40 border border-white/5 rounded-[3rem] overflow-hidden hover:border-blue-500/30 transition-all group">
                  <div className="relative h-72 overflow-hidden">
                    <img src={p.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={p.name} />
                    <div className="absolute top-6 left-6">
                      <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest">{p.status}</span>
                    </div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-bold text-white mb-6 italic uppercase">{p.name}</h3>
                    <div className="space-y-4 border-t border-white/5 pt-6">
                      <div className="flex justify-between text-[10px] tracking-widest uppercase">
                        <span className="text-slate-500 font-black">LOCALISATION</span>
                        <span className="text-white font-bold">{p.location}</span>
                      </div>
                      <div className="flex justify-between text-[10px] tracking-widest uppercase">
                        <span className="text-slate-500 font-black">BUDGET ESTIMÉ</span>
                        <span className="text-blue-500 font-black">{p.budget.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div>
                <h2 className="text-5xl font-black text-white italic uppercase mb-4">Portfolio</h2>
                <p className="text-slate-500 font-medium">Archives visuelles de nos réalisations certifiées.</p>
              </div>
              <div className="flex bg-slate-900 p-2 rounded-2xl border border-white/5">
                {['Tous', 'Structure', 'Bâtiment', 'Gros Œuvre'].map(c => (
                  <button 
                    key={c} 
                    onClick={() => setGalleryFilter(c)} 
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      galleryFilter === c ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredGallery.map(item => (
                <div key={item.id} className="aspect-square rounded-[2.5rem] overflow-hidden border border-white/5 group relative shadow-2xl">
                  <img src={item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={item.title} />
                  <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center p-6 transition-all duration-300">
                    <p className="text-white text-[11px] font-black uppercase text-center italic tracking-widest">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rentals' && (
          <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
            <h2 className="text-5xl font-black text-white mb-16 italic uppercase">Location & Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {rentalItems.map(item => (
                <div key={item.id} className="bg-slate-900/40 p-12 rounded-[4rem] border border-white/5 hover:border-blue-600 transition-all group">
                  <div className="w-20 h-20 bg-blue-600/10 text-blue-500 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <i className={`fas ${item.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">{item.name}</h3>
                  <p className="text-slate-500 text-sm mb-8 italic leading-relaxed">"{item.desc}"</p>
                  <div className="text-blue-500 font-black tracking-widest uppercase text-xs border-b border-white/5 pb-6 mb-8">{item.price}</div>
                  <button className="w-full bg-white text-slate-950 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl">RÉSERVER MAINTENANT</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
            {!isLoggedIn ? (
              <div className="min-h-[60vh] flex items-center justify-center">
                <form 
                  onSubmit={handleLogin} 
                  className="bg-slate-900 p-10 md:p-16 rounded-[4rem] border border-white/10 w-full max-w-lg shadow-3xl space-y-8"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-black text-white italic uppercase tracking-[0.2em] mb-2">Accès Sécurisé</h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Administration PI-CONSTRUCTION</p>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      required 
                      placeholder="Identifiant" 
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white focus:border-blue-600 outline-none font-bold transition-all" 
                      value={loginForm.email} 
                      onChange={e => setLoginForm({...loginForm, email: e.target.value})} 
                    />
                    <input 
                      type="password" 
                      required 
                      placeholder="Code secret" 
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white focus:border-blue-600 outline-none font-bold transition-all" 
                      value={loginForm.password} 
                      onChange={e => setLoginForm({...loginForm, password: e.target.value})} 
                    />
                  </div>
                  {loginError && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">{loginError}</p>}
                  <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 shadow-2xl shadow-blue-600/30 transition-all">DÉVERROUILLER LA CONSOLE</button>
                  <p className="text-slate-700 text-[9px] text-center uppercase font-black">Admin : admin@pi-construction.com / admin</p>
                </form>
              </div>
            ) : (
              <AdminDashboard 
                projects={projects} 
                setProjects={setProjects}
                gallery={galleryItems} 
                setGallery={setGalleryItems}
                rentals={rentalItems} 
                setRentals={setRentalItems}
                logout={handleLogout}
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
