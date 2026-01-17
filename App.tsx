
import React, { useState, useCallback, useMemo } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import { Project, GalleryItem, RentalItem, SiteConfig } from './types';
import { INITIAL_PROJECTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    companyName: 'BATI-PLUS',
    companySuffix: 'CAMEROUN',
    slogan: 'L’INGÉNIERIE DE PRÉCISION',
    logoUrl: '',
    accentColor: '#fbbf24', // Jaune construction type BTP
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070',
    contactPhones: ['(+237) 671 34 54 41', '(+237) 699 46 63 21'],
    contactLocation: 'Zone Industrielle de Bassa\nDouala, Cameroun'
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { id: '1', category: 'Structure', url: 'https://images.unsplash.com/photo-1589939705384-5185138a04b9?auto=format&fit=crop&q=80&w=800', title: 'Ouvrage d\'Art Douala' },
    { id: '2', category: 'Bâtiment', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', title: 'Siège Social R+6' },
    { id: '3', category: 'Gros Œuvre', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800', title: 'Fondations Profondes' },
  ]);

  const [rentalItems, setRentalItems] = useState<RentalItem[]>([
    { id: '1', name: "Pelle Hydraulique 22T", icon: "fa-tractor", price: "250.000 FCFA/J", desc: "Puissance et précision pour vos terrassements." },
    { id: '2', name: "Échafaudage Multidirectionnel", icon: "fa-border-all", price: "Sur Devis", desc: "Sécurité maximale pour travaux en hauteur." },
    { id: '3', name: "Centrale à Béton Mobile", icon: "fa-industry", price: "À l'heure", desc: "Production sur site pour une qualité optimale." }
  ]);

  const [galleryFilter, setGalleryFilter] = useState('Tous');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'admin@batiplus.com' && loginForm.password === 'admin') {
      setIsLoggedIn(true);
    }
  }, [loginForm]);

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
      config={siteConfig}
    >
      <div className="pt-32 pb-20">
        {activeTab === 'home' && (
          <div className="animate-fadeIn space-y-32">
            {/* Hero Section */}
            <section className="px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 relative z-10">
                  <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: siteConfig.accentColor }}></span>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">{siteConfig.slogan}</span>
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-[0.85] mb-10 uppercase">
                    L'EXCELLENCE <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-transparent" style={{ WebkitTextStroke: `1px ${siteConfig.accentColor}` }}>TECHNIQUE.</span>
                  </h1>
                  <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mb-12 leading-relaxed">
                    Études techniques, pilotage de chantiers et location d'engins lourds. Nous bâtissons les piliers du développement industriel au Cameroun.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setActiveTab('projects')} 
                      className="px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all hover:scale-105 shadow-2xl"
                      style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}
                    >
                      Voir l'Expertise
                    </button>
                    <button 
                      onClick={() => setActiveTab('rentals')} 
                      className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Parc Matériels
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-5 relative h-[500px] rounded-[3rem] overflow-hidden border border-white/5 shadow-3xl">
                  <img src={siteConfig.heroImage} className="w-full h-full object-cover" alt="Chantier" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10 p-8 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Dernier Projet</p>
                     <p className="text-xl font-bold text-white italic uppercase tracking-tighter">Réhabilitation Portuaire Douala</p>
                  </div>
                </div>
              </div>
            </section>

            {/* KPI Section */}
            <section className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { val: '15+', label: 'Ans d\'Expérience' },
                 { val: '120+', label: 'Projets Livrés' },
                 { val: '500M', label: 'Budget Moyen' },
                 { val: '45+', label: 'Engins Lourds' }
               ].map((kpi, i) => (
                 <div key={i} className="text-center group">
                    <p className="text-5xl font-black italic tracking-tighter mb-2 group-hover:scale-110 transition-transform" style={{ color: siteConfig.accentColor }}>{kpi.val}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{kpi.label}</p>
                 </div>
               ))}
            </section>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
            <div className="flex items-center space-x-4 mb-16">
               <div className="h-px flex-1 bg-white/10"></div>
               <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Ingénierie & Etudes</h2>
               <div className="h-px flex-1 bg-white/10"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {projects.map(p => (
                <div key={p.id} className="group relative bg-slate-900/20 rounded-[3rem] border border-white/5 overflow-hidden hover:border-yellow-500/20 transition-all">
                  <div className="h-80 overflow-hidden relative">
                    <img src={p.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.name} />
                    <div className="absolute top-8 left-8">
                       <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[9px] font-black uppercase text-slate-950 tracking-widest">{p.status}</span>
                    </div>
                  </div>
                  <div className="p-12">
                    <h3 className="text-3xl font-black text-white italic uppercase mb-6 tracking-tighter">{p.name}</h3>
                    <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                       <div>
                          <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Localisation</p>
                          <p className="text-sm font-bold text-slate-300">{p.location}</p>
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Budget</p>
                          <p className="text-sm font-black text-white">{p.budget.toLocaleString()} FCFA</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rentals' && (
          <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
            <div className="mb-20 text-center">
              <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-4">Parc Matériels</h2>
              <p className="text-slate-500 font-medium">Équipements de pointe certifiés conformes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rentalItems.map(item => (
                <div key={item.id} className="bg-slate-950 border border-white/5 p-12 rounded-[3.5rem] flex flex-col items-center text-center group hover:bg-slate-900/40 transition-all">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-10 transition-transform group-hover:rotate-12" style={{ backgroundColor: `${siteConfig.accentColor}11`, color: siteConfig.accentColor }}>
                    <i className={`fas ${item.icon} text-4xl`}></i>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase italic mb-4 tracking-tighter">{item.name}</h3>
                  <p className="text-slate-500 text-sm italic mb-10 leading-relaxed max-w-[200px]">"{item.desc}"</p>
                  <div className="w-full pt-8 border-t border-white/5 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Tarif de base</span>
                    <span className="text-xl font-black text-white">{item.price}</span>
                  </div>
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
                  className="bg-slate-950 p-16 rounded-[4rem] border border-white/10 w-full max-w-md shadow-3xl text-center"
                >
                  <i className="fas fa-lock text-3xl mb-8 opacity-20"></i>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-widest mb-10">Auth Admin</h2>
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      required 
                      placeholder="Email" 
                      className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-white outline-none focus:border-yellow-600 font-bold transition-all" 
                      value={loginForm.email} 
                      onChange={e => setLoginForm({...loginForm, email: e.target.value})} 
                    />
                    <input 
                      type="password" 
                      required 
                      placeholder="Password" 
                      className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-white outline-none focus:border-yellow-600 font-bold transition-all" 
                      value={loginForm.password} 
                      onChange={e => setLoginForm({...loginForm, password: e.target.value})} 
                    />
                  </div>
                  <button type="submit" className="w-full text-slate-950 py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all mt-10 hover:opacity-90" style={{ backgroundColor: siteConfig.accentColor }}>Accéder au Système</button>
                  <p className="mt-8 text-[8px] font-black text-slate-700 uppercase tracking-widest">Compte Test : admin@batiplus.com / admin</p>
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
                config={siteConfig}
                setConfig={setSiteConfig}
                logout={() => setIsLoggedIn(false)}
              />
            )}
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
              <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Archives <br/>Chantiers.</h2>
              <div className="flex bg-slate-950 p-2 rounded-2xl border border-white/5">
                {['Tous', 'Structure', 'Bâtiment', 'Gros Œuvre'].map(c => (
                  <button 
                    key={c} 
                    onClick={() => setGalleryFilter(c)} 
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      galleryFilter === c ? 'text-slate-950' : 'text-slate-500 hover:text-white'
                    }`}
                    style={galleryFilter === c ? { backgroundColor: siteConfig.accentColor } : {}}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredGallery.map(item => (
                <div key={item.id} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900 shadow-2xl aspect-[4/5]">
                  <img src={item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: siteConfig.accentColor }}>{item.category}</p>
                    <p className="text-2xl font-bold text-white italic uppercase tracking-tighter leading-tight">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
