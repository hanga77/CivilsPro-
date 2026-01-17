
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
            {/* HERO SECTION WORLD CLASS RESPONSIVE */}
            <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src={siteConfig.heroImage} 
                  className="w-full h-full object-cover scale-105 animate-slowZoom" 
                  alt="Construction background" 
                />
                <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#020617] via-[#020617]/90 lg:via-[#020617]/80 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-24 lg:pt-20">
                <div className="lg:col-span-8 text-center lg:text-left">
                  <div className="inline-flex items-center space-x-3 mb-6 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                    <span className="relative flex h-2 w-2 md:h-3 md:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: siteConfig.accentColor }}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3" style={{ backgroundColor: siteConfig.accentColor }}></span>
                    </span>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white whitespace-nowrap">Engineering Excellence • 2024</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[9rem] font-black text-white italic tracking-tighter leading-[0.9] lg:leading-[0.85] mb-6 md:mb-8 uppercase break-words">
                    BÂTIR LE <br/>
                    <span className="text-transparent" style={{ WebkitTextStroke: `1px ${siteConfig.accentColor}` }}>MASTODONTE.</span>
                  </h1>
                  
                  <p className="text-slate-300 text-sm md:text-xl lg:text-2xl font-medium max-w-2xl mb-8 md:mb-12 leading-relaxed opacity-90 border-l-2 lg:border-l-4 pl-4 lg:pl-6 mx-auto lg:mx-0 text-left" style={{ borderColor: siteConfig.accentColor }}>
                    L’ingénierie ingénieuse et réactive pour transformer vos visions en infrastructures indestructibles au Cameroun.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 md:gap-5">
                    <button 
                      onClick={() => setActiveTab('contact')} 
                      className="group relative px-8 lg:px-10 py-4 lg:py-6 rounded-full font-black text-[10px] lg:text-[11px] uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
                      style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}
                    >
                      <span className="relative z-10">Lancer un projet</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('projects')} 
                      className="px-8 lg:px-10 py-4 lg:py-6 rounded-full font-black text-[10px] lg:text-[11px] uppercase tracking-widest border border-white/20 text-white hover:bg-white/5 transition-all"
                    >
                      Voir le Portfolio
                    </button>
                  </div>
                </div>

                {/* Counter Section Responsive */}
                <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4 mt-8 lg:mt-0">
                   <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem]">
                      <p className="text-2xl md:text-4xl font-black text-white italic mb-1">150+</p>
                      <p className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-slate-500">Missions Expertisées</p>
                   </div>
                   <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem]">
                      <p className="text-2xl md:text-4xl font-black text-white italic mb-1">12B+</p>
                      <p className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-slate-500">Budget Géré (FCFA)</p>
                   </div>
                   <div className="col-span-2 lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem]">
                      <p className="text-2xl md:text-4xl font-black text-white italic mb-1">100%</p>
                      <p className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-slate-500">Conformité Technique</p>
                   </div>
                </div>
              </div>
            </section>

            {/* PARTNERS LOGO STRIP RESPONSIVE */}
            <section className="py-8 md:py-12 bg-white/5 border-y border-white/5 overflow-hidden">
               <div className="flex items-center space-x-12 md:space-x-20 animate-infiniteScroll whitespace-nowrap opacity-30 grayscale contrast-200">
                  <span className="text-xl md:text-2xl font-black text-white tracking-tighter italic uppercase">Global Engineering</span>
                  <span className="text-xl md:text-2xl font-black text-white tracking-tighter italic uppercase">Civil Masters</span>
                  <span className="text-xl md:text-2xl font-black text-white tracking-tighter italic uppercase">Infrastructure SA</span>
                  <span className="text-xl md:text-2xl font-black text-white tracking-tighter italic uppercase">BTP Africa</span>
                  <span className="text-xl md:text-2xl font-black text-white tracking-tighter italic uppercase">Modern Structures</span>
                  <span className="text-xl md:text-2xl font-black text-white tracking-tighter italic uppercase">Global Engineering</span>
                  <span className="text-xl md:text-2xl font-black text-white tracking-tighter italic uppercase">Civil Masters</span>
               </div>
            </section>

            {/* SERVICES MATRIX SECTION RESPONSIVE */}
            <section className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
               <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 md:mb-24 gap-6">
                  <div className="max-w-2xl">
                     <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-3 md:mb-4" style={{ color: siteConfig.accentColor }}>Core Services</p>
                     <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                        NOS MATRICES DE <br/><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>VALEUR.</span>
                     </h2>
                  </div>
                  <button onClick={() => setActiveTab('expertise')} className="text-[9px] md:text-[11px] font-black uppercase tracking-widest border-b-2 pb-2 self-start lg:self-auto" style={{ borderColor: siteConfig.accentColor }}>Savoir-faire complet</button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                  {[
                    { title: "Génie Civil & VRD", desc: "Routes, ponts et infrastructures urbaines complexes. Une maîtrise totale.", icon: "fa-helmet-safety" },
                    { title: "Ingénierie Structure", desc: "Calculs Eurocodes, audit de stabilité et renforcements avancés.", icon: "fa-compass-drafting" },
                    { title: "Audit Technique", desc: "Contrôle qualité, expertise sinistre et diagnostic de solidité.", icon: "fa-magnifying-glass-chart" }
                  ].map((service, i) => (
                    <div key={i} className="group relative bg-slate-900/40 border border-white/5 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] transition-all hover:bg-slate-900">
                       <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-10 text-white text-2xl md:text-3xl transition-transform group-hover:rotate-12" style={{ color: siteConfig.accentColor }}>
                          <i className={`fas ${service.icon}`}></i>
                       </div>
                       <h3 className="text-xl md:text-2xl font-black text-white italic uppercase mb-3 md:mb-4">{service.title}</h3>
                       <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 md:mb-10 italic">{service.desc}</p>
                       <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-30 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          <i className="fa-solid fa-arrow-right-long text-xl" style={{ color: siteConfig.accentColor }}></i>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* CALL TO ACTION LARGE RESPONSIVE */}
            <section className="py-16 md:py-32 px-4 md:px-6">
               <div className="max-w-7xl mx-auto bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 relative overflow-hidden text-center">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white italic uppercase tracking-tighter mb-8 md:mb-10 relative z-10 leading-[0.9]">
                    PRÊT À BÂTIR VOTRE <br/><span style={{ color: siteConfig.accentColor }}>PROCHAIN CHEF-D'ŒUVRE ?</span>
                  </h2>
                  <p className="text-slate-400 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto relative z-10 font-medium">
                    Consultez nos experts pour une étude de faisabilité. Notre bureau d'études répond sous 24h.
                  </p>
                  <button onClick={() => setActiveTab('contact')} className="w-full sm:w-auto px-8 lg:px-12 py-5 lg:py-6 rounded-full bg-white text-black font-black text-[10px] lg:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-2xl transition-transform hover:scale-105 active:scale-95 relative z-10">
                    Démarrer l'audit technique
                  </button>
               </div>
            </section>
          </div>
        )}

        {/* ADMIN LOGIN RESPONSIVE FIX */}
        {activeTab === 'admin' && (
          <div className="px-4 md:px-6 max-w-7xl mx-auto animate-fadeIn min-h-[70vh] flex flex-col items-center justify-center py-12">
            {!isLoggedIn ? (
              <div className="flex flex-col items-center justify-center w-full max-w-md">
                <div className="bg-slate-950 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 w-full text-center shadow-3xl mb-8 md:mb-12">
                  <h2 className="text-xl md:text-2xl font-black text-white italic uppercase mb-8 md:mb-12 tracking-tighter">STATION MASTER</h2>
                  <form onSubmit={handleLogin} className="space-y-4 md:space-y-5 text-left">
                    <div className="space-y-1">
                      <label className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase ml-2 tracking-widest">Identifiant Administrateur</label>
                      <input name="email" type="email" required placeholder="admin@piconstruction.com" className="w-full bg-slate-900 border border-white/5 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 text-white text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase ml-2 tracking-widest">Code d'Accès</label>
                      <input name="password" type="password" required placeholder="••••••••" className="w-full bg-slate-900 border border-white/5 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 text-white text-sm" />
                    </div>
                    <button type="submit" className="w-full text-slate-950 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[11px] uppercase mt-6 md:mt-10 hover:opacity-90 transition-opacity tracking-[0.1em] md:tracking-[0.2em]" style={{ backgroundColor: siteConfig.accentColor }}>DÉVERROUILLER LE SYSTÈME</button>
                  </form>
                </div>
                
                <div className="w-full bg-blue-500/5 border border-blue-500/10 p-6 md:p-8 rounded-2xl md:rounded-3xl text-center">
                  <p className="text-[8px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4">Accès de démonstration</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5">
                      <p className="text-[6px] text-slate-500 uppercase font-black mb-1">Email</p>
                      <p className="text-[9px] md:text-[11px] text-white font-mono truncate">admin@piconstruction.com</p>
                    </div>
                    <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5">
                      <p className="text-[6px] text-slate-500 uppercase font-black mb-1">Pass</p>
                      <p className="text-[9px] md:text-[11px] text-white font-mono">admin</p>
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

        {/* OTHER TABS RESPONSIVE CONTENT */}
        {activeTab !== 'home' && activeTab !== 'admin' && (
          <div className="animate-fadeIn pt-12 md:pt-24 px-4 sm:px-6 max-w-7xl mx-auto pb-20">
             {activeTab === 'expertise' && (
               <>
                <h2 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-12 md:mb-16">NOTRE <span style={{ color: siteConfig.accentColor }}>EXPERTISE.</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                  {[
                    { title: "Ingénierie Structurelle", desc: "Calculs de structures béton armé et métallique.", icon: "fa-building-columns" },
                    { title: "Génie Civil", desc: "Routes, ponts, aménagements hydrauliques.", icon: "fa-helmet-safety" },
                    { title: "Travaux Publics", desc: "Gros œuvre et second œuvre rigoureux.", icon: "fa-trowel-bricks" },
                    { title: "Études & Conseils", desc: "Optimisation des coûts et planification.", icon: "fa-magnifying-glass-chart" }
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-900/60 p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-white/5 group">
                      <i className={`fas ${item.icon} text-3xl md:text-5xl mb-6 md:mb-10`} style={{ color: siteConfig.accentColor }}></i>
                      <h3 className="text-xl md:text-2xl font-black text-white italic uppercase mb-4">{item.title}</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed italic">{item.desc}</p>
                    </div>
                  ))}
                </div>
               </>
             )}

             {activeTab === 'projects' && (
               <>
                <h2 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-12 md:mb-16">NOS <span style={{ color: siteConfig.accentColor }}>SERVICES.</span></h2>
                <div className="grid grid-cols-1 gap-8 md:gap-12">
                  {projects.map(p => (
                    <div key={p.id} className="bg-slate-900/40 rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/5 flex flex-col lg:row transition-all hover:bg-slate-900/60 lg:flex-row">
                      <div className="lg:w-1/3 h-[250px] md:h-[350px] lg:h-auto overflow-hidden">
                        <img src={p.thumbnail} className="w-full h-full object-cover" alt={p.name} />
                      </div>
                      <div className="flex-grow p-8 md:p-16">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: siteConfig.accentColor }}>{p.status}</p>
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter">{p.name}</h3>
                          </div>
                          <span className="font-mono text-[9px] text-slate-500 uppercase bg-white/5 px-4 py-2 rounded-full border border-white/5">{p.location}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                          <div>
                            <p className="text-[8px] text-slate-500 uppercase font-black mb-1 md:mb-2">Budget Projet</p>
                            <p className="text-xl md:text-2xl font-bold text-white font-mono">{p.budget.toLocaleString()} FCFA</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-slate-500 uppercase font-black mb-1 md:mb-2">Maître d'Ouvrage</p>
                            <p className="text-xl md:text-2xl font-bold text-white italic uppercase tracking-tighter">{p.client}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
               </>
             )}

             {activeTab === 'gallery' && (
               <>
                <h2 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-12 md:mb-16">CHANTIERS <span style={{ color: siteConfig.accentColor }}>PI.</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {galleryItems.map(item => (
                    <div key={item.id} className="group relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 aspect-square">
                      <img src={item.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 md:p-8">
                        <p className="text-[7px] md:text-[8px] font-black uppercase text-white/50 mb-1">{item.category}</p>
                        <p className="text-white text-sm md:text-base font-bold italic uppercase">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
               </>
             )}

             {activeTab === 'rentals' && (
               <>
                <h2 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-12 md:mb-16">LOUER DU <span style={{ color: siteConfig.accentColor }}>LOURD.</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  {rentalItems.map(r => (
                    <div key={r.id} className="bg-slate-900/60 p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-white/5 flex flex-col items-center text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 text-3xl md:text-4xl" style={{ color: siteConfig.accentColor }}>
                        <i className={`fas ${r.icon}`}></i>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white italic uppercase mb-3">{r.name}</h3>
                      <p className="text-slate-400 text-xs md:text-sm mb-6 italic leading-relaxed">{r.desc}</p>
                      <p className="text-xl md:text-2xl font-black font-mono mb-8" style={{ color: siteConfig.accentColor }}>{r.price}</p>
                      <button onClick={() => setActiveTab('contact')} className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-white text-black font-black text-[9px] md:text-[10px] uppercase tracking-widest">RÉSERVER</button>
                    </div>
                  ))}
                </div>
               </>
             )}

             {activeTab === 'contact' && (
               <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter text-center mb-12 md:mb-16">PARLONS <span style={{ color: siteConfig.accentColor }}>BTP.</span></h2>
                {showSuccess && <div className="bg-green-500 text-black p-4 md:p-6 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase mb-8 text-center animate-bounce">Message envoyé avec succès !</div>}
                <form onSubmit={handleContactSubmit} className="bg-slate-900/40 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 shadow-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-500 ml-4">Votre Identité</label>
                    <input required placeholder="Nom ou Entreprise" className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 text-white text-sm focus:border-white" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-500 ml-4">Canal Email</label>
                    <input required type="email" placeholder="mail@domaine.com" className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 text-white text-sm focus:border-white" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-500 ml-4">Détails du projet technique</label>
                    <textarea required rows={5} placeholder="Décrivez votre besoin..." className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 text-white text-sm focus:border-white" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="sm:col-span-2 py-5 md:py-6 rounded-xl md:rounded-3xl font-black text-[10px] md:text-[11px] uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95" style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}>TRANSMETTRE AU BUREAU D'ÉTUDES</button>
                </form>
               </div>
             )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        @keyframes infiniteScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-slowZoom { animation: slowZoom 30s infinite alternate ease-in-out; }
        .animate-infiniteScroll { animation: infiniteScroll 60s linear infinite; }
        @media (max-width: 640px) { .animate-infiniteScroll { animation: infiniteScroll 30s linear infinite; } }
      `}</style>
    </Layout>
  );
};

export default App;
