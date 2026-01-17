
import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import { Project, GalleryItem, RentalItem } from './types';
import { INITIAL_PROJECTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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

  const [galleryFilter, setGalleryFilter] = useState('Tous');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email === 'admin@pi-construction.com' && loginData.password === 'admin') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Identifiants administrateur incorrects');
    }
  }, [loginData]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setActiveTab('home');
  }, []);

  const filteredGallery = galleryFilter === 'Tous' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isLoggedIn} setIsAdmin={() => {}}>
      {activeTab === 'home' && (
        <div className="animate-fadeIn pt-16">
          <section className="relative px-6 py-4">
            <div className="max-w-7xl mx-auto relative h-[600px] md:h-[700px] rounded-[3.5rem] overflow-hidden shadow-2xl group border border-blue-500/20">
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover grayscale brightness-[0.4]" alt="Hero" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0033AD]/90 via-slate-950/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center px-12 md:px-24">
                <div className="max-w-4xl">
                  <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-10 italic uppercase">
                    Bâtir avec <br/> <span className="text-blue-500">Intégrité.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-xl font-light">Pi-Construction BTP SARL : Expertise agile et précision mathématique au Cameroun.</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveTab('gallery')} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all shadow-xl">RÉALISATIONS</button>
                    <button onClick={() => setActiveTab('rentals')} className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all">LOCATION</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="px-6 py-24 max-w-7xl mx-auto animate-fadeIn pt-32">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">GALERIE.</h1>
            <div className="flex bg-slate-900 p-1 rounded-2xl border border-white/5">
              {['Tous', 'Structure', 'Bâtiment', 'Gros Œuvre'].map(cat => (
                <button key={cat} onClick={() => setGalleryFilter(cat)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${galleryFilter === cat ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>{cat}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map(item => (
              <div key={item.id} className="group relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5">
                <img src={item.url} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-blue-500 font-black text-[9px] uppercase tracking-widest mb-2">{item.category}</span>
                  <h3 className="text-xl font-black text-white italic uppercase">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rentals' && (
        <div className="px-6 py-24 max-w-7xl mx-auto animate-fadeIn pt-32">
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase mb-16">LOCATION MATÉRIEL.</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rentalItems.map((item) => (
              <div key={item.id} className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 group hover:border-blue-600/40 transition-all">
                <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <i className={`fas ${item.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-black text-white mb-4 italic uppercase">{item.name}</h3>
                <p className="text-slate-500 text-xs mb-8 italic">{item.desc}</p>
                <div className="text-blue-400 font-black tracking-widest uppercase text-[10px] mb-8">{item.price}</div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-[9px] tracking-widest uppercase hover:bg-blue-500 transition-all">RÉSERVER</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="px-6 py-24 max-w-7xl mx-auto animate-fadeIn pt-32">
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase mb-16">SUIVI CHANTIERS.</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="aspect-[3/4] rounded-[3.5rem] overflow-hidden relative border border-white/5">
                <img src={project.thumbnail} className="w-full h-full object-cover grayscale" alt={project.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 p-10 flex flex-col justify-end">
                  <h3 className="text-2xl font-black text-white italic mb-4 uppercase">{project.name}</h3>
                  <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <span className="text-blue-400 text-[8px] font-black uppercase tracking-widest">{project.status}</span>
                    <span className="text-white font-black text-xs italic">{project.budget.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'admin' && (
        !isLoggedIn ? (
          <div className="min-h-[80vh] flex items-center justify-center px-6 pt-24">
            <div className="bg-slate-900 border border-white/10 p-12 rounded-[3.5rem] w-full max-w-md shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">ADMINISTRATION.</h2>
                <p className="text-slate-500 mt-2 text-[10px] font-black uppercase tracking-widest">Espace Sécurisé Pi-BTP</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <input 
                  type="email" 
                  required 
                  placeholder="Email"
                  className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none font-bold"
                  value={loginData.email}
                  onChange={e => setLoginData({...loginData, email: e.target.value})}
                />
                <input 
                  type="password" 
                  required 
                  placeholder="Mot de passe"
                  className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none font-bold"
                  value={loginData.password}
                  onChange={e => setLoginData({...loginData, password: e.target.value})}
                />
                {loginError && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest text-center">{loginError}</p>}
                <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-blue-500 transition-all">CONNEXION</button>
              </form>
            </div>
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
        )
      )}
    </Layout>
  );
};

export default App;
