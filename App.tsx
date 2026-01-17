
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import { Project, GalleryItem, RentalItem, SiteConfig, ContactMessage } from './types';
import { INITIAL_PROJECTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    companyName: 'PI-CONSTRUCTION',
    companySuffix: 'BTP SARL',
    slogan: 'L’INGÉNIERIE INGÉNIEUSE & RÉACTIVE',
    logoUrl: '',
    accentColor: '#fbbf24', 
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070',
    contactPhones: ['(+237) 671 34 54 41', '(+237) 699 46 63 21'],
    contactLocation: 'Déploiement National (Douala - Yaoundé)',
    footerAbout: 'PI-CONSTRUCTION BTP SARL est une jeune structure portée par des experts hautement qualifiés. Créativité, ingéniosité et perspicacité guident chacune de nos interventions.',
    socialLinks: {
      facebook: 'https://facebook.com/piconstruction',
      linkedin: 'https://linkedin.com/company/piconstruction',
      instagram: '',
      whatsapp: '+237671345441'
    }
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { id: '1', category: 'Ingénierie', url: 'https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=80&w=800', title: 'Bureau d\'études' },
    { id: '2', category: 'Matériel', url: 'https://images.unsplash.com/photo-1579362391512-972109869389?auto=format&fit=crop&q=80&w=800', title: 'Équipements' },
    { id: '3', category: 'Chantier', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800', title: 'Mise en œuvre' }
  ]);

  const [rentalItems, setRentalItems] = useState<RentalItem[]>([
    { id: '1', name: "Pelle Hydraulique", icon: "fa-tractor", price: "500.000 FCFA/Jour", desc: "Performance garantie pour gros terrassement." },
    { id: '2', name: "Camion Benne", icon: "fa-truck-fast", price: "120.000 FCFA/Voyage", desc: "Logistique de chantier réactive." }
  ]);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Ingénierie', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: ContactMessage = {
      ...contactForm,
      id: Date.now().toString(),
      date: new Date().toLocaleString('fr-FR'),
      isRead: false
    };
    setMessages(prev => [newMessage, ...prev]);
    setShowSuccess(true);
    setContactForm({ name: '', email: '', subject: 'Ingénierie', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailInput = (e.target as any).email.value;
    const passwordInput = (e.target as any).password.value;
    if (emailInput === 'admin@piconstruction.com' && passwordInput === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert("Identifiants incorrects. Utilisez admin@piconstruction.com / admin");
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isLoggedIn} setIsAdmin={setIsLoggedIn} config={siteConfig}>
      <div className="pt-16 lg:pt-0 overflow-x-hidden">
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* HERO SECTION WITH RESTORED IMAGE */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
              {/* Image Layer */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={siteConfig.heroImage} 
                  className="w-full h-full object-cover scale-105 animate-slowZoom transition-transform duration-[10s]" 
                  alt="Construction Hero" 
                />
                {/* Optimized Overlays */}
                <div className="absolute inset-0 bg-[#020617]/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#020617] lg:via-[#020617]/80 lg:to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 lg:pt-0">
                <div className="lg:col-span-8 text-center lg:text-left">
                  <div className="inline-flex items-center space-x-3 mb-8 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: siteConfig.accentColor }}></span>
                      <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: siteConfig.accentColor }}></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Engineering Excellence • Cameroon</span>
                  </div>
                  
                  <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] font-black text-white italic tracking-tighter leading-[0.85] mb-8 uppercase drop-shadow-2xl">
                    BÂTIR LE <br/>
                    <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${siteConfig.accentColor}` }}>MASTODONTE.</span>
                  </h1>
                  
                  <p className="text-slate-100 text-lg md:text-2xl font-medium max-w-2xl mb-12 leading-relaxed opacity-100 border-l-4 pl-6 mx-auto lg:mx-0 text-left drop-shadow-lg" style={{ borderColor: siteConfig.accentColor }}>
                    L’ingénierie ingénieuse pour transformer vos visions en infrastructures indestructibles.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
                    <button 
                      onClick={() => setActiveTab('contact')} 
                      className="px-10 py-6 rounded-full font-black text-[11px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl"
                      style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}
                    >
                      Lancer un projet
                    </button>
                    <button 
                      onClick={() => setActiveTab('projects')} 
                      className="px-10 py-6 rounded-full font-black text-[11px] uppercase tracking-widest border border-white/40 text-white backdrop-blur-md hover:bg-white/10 transition-all shadow-xl"
                    >
                      Voir le Portfolio
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 grid grid-cols-1 gap-4 hidden lg:grid">
                   <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                      <p className="text-4xl font-black text-white italic mb-1">150+</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Missions Expertisées</p>
                   </div>
                   <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                      <p className="text-4xl font-black text-white italic mb-1">12B+</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Budget Géré (FCFA)</p>
                   </div>
                   <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                      <p className="text-4xl font-black text-white italic mb-1">100%</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Conformité Technique</p>
                   </div>
                </div>
              </div>
            </section>

            {/* PARTNERS STRIP */}
            <section className="py-12 bg-white/5 border-y border-white/5 overflow-hidden">
               <div className="flex items-center space-x-20 animate-infiniteScroll whitespace-nowrap opacity-30 grayscale contrast-200">
                  <span className="text-2xl font-black text-white tracking-tighter italic uppercase">Global Engineering</span>
                  <span className="text-2xl font-black text-white tracking-tighter italic uppercase">Civil Masters</span>
                  <span className="text-2xl font-black text-white tracking-tighter italic uppercase">Infrastructure SA</span>
                  <span className="text-2xl font-black text-white tracking-tighter italic uppercase">BTP Africa</span>
                  <span className="text-2xl font-black text-white tracking-tighter italic uppercase">Modern Structures</span>
                  <span className="text-2xl font-black text-white tracking-tighter italic uppercase">Global Engineering</span>
                  <span className="text-2xl font-black text-white tracking-tighter italic uppercase">Civil Masters</span>
               </div>
            </section>

            {/* SERVICES MATRIX */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
               <div className="flex flex-col lg:row justify-between lg:items-end mb-24 gap-8">
                  <div className="max-w-2xl">
                     <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4" style={{ color: siteConfig.accentColor }}>Core Services</p>
                     <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                        NOS MATRICES DE <br/><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>VALEUR.</span>
                     </h2>
                  </div>
                  <button onClick={() => setActiveTab('expertise')} className="text-[11px] font-black uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: siteConfig.accentColor }}>Voir tout le savoir-faire</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                    { title: "Génie Civil & VRD", desc: "Routes, ponts et infrastructures urbaines complexes. Une maîtrise totale de l'environnement.", icon: "fa-helmet-safety" },
                    { title: "Ingénierie Structure", desc: "Calculs Eurocodes, audit de stabilité et renforcements structurels avancés.", icon: "fa-compass-drafting" },
                    { title: "Audit Technique", desc: "Contrôle qualité, expertise sinistre et diagnostic de solidité pour bâtiments.", icon: "fa-magnifying-glass-chart" }
                  ].map((service, i) => (
                    <div key={i} className="group relative bg-slate-900/40 border border-white/5 p-12 rounded-[3rem] transition-all hover:bg-slate-900 hover:scale-[1.02]">
                       <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 text-white text-3xl transition-transform group-hover:rotate-12" style={{ color: siteConfig.accentColor }}>
                          <i className={`fas ${service.icon}`}></i>
                       </div>
                       <h3 className="text-2xl font-black text-white italic uppercase mb-4">{service.title}</h3>
                       <p className="text-slate-400 text-sm leading-relaxed mb-10 italic">{service.desc}</p>
                       <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <i className="fa-solid fa-arrow-right-long text-xl" style={{ color: siteConfig.accentColor }}></i>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        )}

        {/* ADMIN AND OTHER TABS */}
        {activeTab === 'admin' && (
          <div className="px-4 md:px-6 max-w-7xl mx-auto animate-fadeIn min-h-[70vh] flex flex-col items-center justify-center py-12">
            {!isLoggedIn ? (
              <div className="flex flex-col items-center justify-center w-full max-w-md">
                <div className="bg-slate-950 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 w-full text-center shadow-3xl mb-8 md:mb-12">
                  <h2 className="text-xl md:text-2xl font-black text-white italic uppercase mb-12 tracking-tighter">STATION MASTER</h2>
                  <form onSubmit={handleLogin} className="space-y-5 text-left">
                    <div className="space-y-1">
                      <label className="text-[8px] font-black text-slate-500 uppercase ml-2 tracking-widest">Identifiant Administrateur</label>
                      <input name="email" type="email" required placeholder="admin@piconstruction.com" className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-white text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black text-slate-500 uppercase ml-2 tracking-widest">Code d'Accès</label>
                      <input name="password" type="password" required placeholder="••••••••" className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-white text-sm" />
                    </div>
                    <button type="submit" className="w-full text-slate-950 py-6 rounded-2xl font-black text-[11px] uppercase mt-10 hover:opacity-90 transition-opacity tracking-[0.2em]" style={{ backgroundColor: siteConfig.accentColor }}>DÉVERROUILLER LE SYSTÈME</button>
                  </form>
                </div>
                
                <div className="w-full bg-blue-500/5 border border-blue-500/10 p-8 rounded-3xl text-center">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Accès de démonstration</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5 text-left">
                      <p className="text-[7px] text-slate-500 uppercase font-black mb-1">Email</p>
                      <p className="text-[10px] text-white font-mono truncate">admin@piconstruction.com</p>
                    </div>
                    <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5 text-left">
                      <p className="text-[7px] text-slate-500 uppercase font-black mb-1">Pass</p>
                      <p className="text-[10px] text-white font-mono">admin</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <AdminDashboard 
                projects={projects} setProjects={setProjects} 
                gallery={galleryItems} setGallery={setGalleryItems} 
                rentals={rentalItems} setRentals={setRentalItems} 
                messages={messages} setMessages={setMessages} 
                config={siteConfig} setConfig={setSiteConfig} 
                logout={() => setIsLoggedIn(false)} 
              />
            )}
          </div>
        )}

        {/* Content for other tabs Expertise, Projects, Gallery, Rentals, Contact */}
        {activeTab !== 'home' && activeTab !== 'admin' && (
          <div className="animate-fadeIn pt-24 px-6 max-w-7xl mx-auto pb-20">
             {activeTab === 'expertise' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    { title: "Ingénierie Structurelle", desc: "Calculs de structures béton armé et métallique, audit de solidité.", icon: "fa-building-columns" },
                    { title: "Génie Civil", desc: "Routes, ponts, aménagements hydrauliques et terrassements.", icon: "fa-helmet-safety" },
                    { title: "Travaux Publics", desc: "Réalisation complète de chantiers gros œuvre et second œuvre.", icon: "fa-trowel-bricks" },
                    { title: "Études & Conseils", desc: "Planification stratégique et optimisation des coûts de construction.", icon: "fa-magnifying-glass-chart" }
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-900/60 p-12 rounded-[3.5rem] border border-white/5">
                      <i className={`fas ${item.icon} text-5xl mb-10`} style={{ color: siteConfig.accentColor }}></i>
                      <h3 className="text-2xl font-black text-white italic uppercase mb-4">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed font-medium italic">{item.desc}</p>
                    </div>
                  ))}
                </div>
             )}
             
             {activeTab === 'projects' && (
                <div className="grid grid-cols-1 gap-12">
                  {projects.map(p => (
                    <div key={p.id} className="bg-slate-900/40 rounded-[3rem] overflow-hidden border border-white/5 flex flex-col lg:flex-row transition-all hover:bg-slate-900/60">
                      <div className="lg:w-1/3 h-[300px] lg:h-auto overflow-hidden">
                        <img src={p.thumbnail} className="w-full h-full object-cover" alt={p.name} />
                      </div>
                      <div className="flex-grow p-10 md:p-16 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-10">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: siteConfig.accentColor }}>{p.status}</p>
                              <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">{p.name}</h3>
                            </div>
                            <span className="font-mono text-[10px] text-slate-500 uppercase bg-white/5 px-4 py-2 rounded-full border border-white/5">{p.location}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-10">
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase font-black mb-2">Budget Projet</p>
                              <p className="text-2xl font-bold text-white font-mono">{p.budget.toLocaleString()} FCFA</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase font-black mb-2">Maître d'Ouvrage</p>
                              <p className="text-2xl font-bold text-white italic uppercase tracking-tighter">{p.client}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             )}

             {activeTab === 'gallery' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {galleryItems.map(item => (
                    <div key={item.id} className="group relative rounded-[2rem] overflow-hidden border border-white/10 aspect-square cursor-zoom-in">
                      <img src={item.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                        <p className="text-[8px] font-black uppercase text-white/50 mb-1">{item.category}</p>
                        <p className="text-white font-bold italic uppercase">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
             )}

             {activeTab === 'rentals' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {rentalItems.map(r => (
                    <div key={r.id} className="bg-slate-900/60 p-12 rounded-[3.5rem] border border-white/5 flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-8" style={{ color: siteConfig.accentColor }}>
                        <i className={`fas ${r.icon} text-5xl`}></i>
                      </div>
                      <h3 className="text-3xl font-black text-white italic uppercase mb-4">{r.name}</h3>
                      <p className="text-slate-400 mb-8 italic text-lg leading-relaxed">{r.desc}</p>
                      <p className="text-2xl font-black font-mono mb-10" style={{ color: siteConfig.accentColor }}>{r.price}</p>
                      <button onClick={() => setActiveTab('contact')} className="w-full py-5 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">RÉSERVER L'ENGIN</button>
                    </div>
                  ))}
                </div>
             )}

             {activeTab === 'contact' && (
                <div className="max-w-4xl mx-auto">
                  {showSuccess && <div className="bg-green-500 text-black p-6 rounded-2xl font-black text-[10px] uppercase tracking-widest mb-10 text-center animate-bounce">Message envoyé !</div>}
                  <form onSubmit={handleContactSubmit} className="bg-slate-900/40 p-10 md:p-20 rounded-[4rem] border border-white/5 shadow-3xl grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500 ml-4">Identité</label>
                      <input required placeholder="Nom / Entreprise" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white text-sm" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500 ml-4">Email</label>
                      <input required type="email" placeholder="mail@domaine.com" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white text-sm" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500 ml-4">Projet Technique</label>
                      <textarea required rows={5} placeholder="Détails..." className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white text-sm" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="md:col-span-2 py-6 rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl" style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}>DEMANDER UN DEVIS</button>
                  </form>
                </div>
             )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        @keyframes infiniteScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-slowZoom { animation: slowZoom 20s infinite alternate ease-in-out; }
        .animate-infiniteScroll { animation: infiniteScroll 60s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </Layout>
  );
};

export default App;
