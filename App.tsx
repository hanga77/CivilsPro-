
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import { Project, GalleryItem, RentalItem, SiteConfig, ContactMessage } from './types';
import { INITIAL_PROJECTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  // Configuration globale modifiable via l'admin
  const [siteConfig, setConfig] = useState<SiteConfig>({
    companyName: 'PI-CONSTRUCTION',
    companySuffix: 'BTP SARL',
    slogan: 'L’INGÉNIERIE INGÉNIEUSE & RÉACTIVE',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/4322/4322992.png',
    accentColor: '#fbbf24', 
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070',
    contactPhones: ['(+237) 671 34 54 41', '(+237) 699 46 63 21'],
    contactLocation: 'Déploiement National (Douala - Yaoundé)',
    footerAbout: 'PI-CONSTRUCTION BTP SARL est une jeune structure portée par des experts hautement qualifiés. Créativité, ingéniosité et perspicacité.',
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
    { id: '2', category: 'Matériel', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', title: 'Équipements' },
    { id: '3', category: 'Chantier', url: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=800', title: 'Mise en œuvre' }
  ]);

  const [rentalItems, setRentalItems] = useState<RentalItem[]>([
    { id: '1', name: "Pelle Hydraulique", icon: "fa-tractor", price: "500.000 FCFA/Jour", desc: "Performance garantie pour gros terrassement." },
    { id: '2', name: "Camion Benne", icon: "fa-truck-fast", price: "120.000 FCFA/Voyage", desc: "Logistique de chantier réactive." },
    { id: '3', name: "Bulldozer D8", icon: "fa-shovels", price: "750.000 FCFA/Jour", desc: "Nivellement de précision pour grands espaces." }
  ]);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Ingénierie', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      alert("Identifiants incorrects (admin@piconstruction.com / admin)");
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isLoggedIn} setIsAdmin={setIsLoggedIn} config={siteConfig}>
      <div className="pt-16 lg:pt-0">
        
        {/* ONGLET ACCUEIL */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* HERO : Visibilité corrigée */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
              <div className="absolute inset-0 z-0">
                <img 
                  src={siteConfig.heroImage} 
                  className="w-full h-full object-cover scale-105 animate-slowZoom" 
                  alt="Background" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8">
                  <h1 className="text-6xl md:text-[9rem] font-black text-white italic tracking-tighter leading-[0.85] mb-8 uppercase">
                    BÂTIR LE <br/>
                    <span className="text-transparent" style={{ WebkitTextStroke: `2px ${siteConfig.accentColor}` }}>MASTODONTE.</span>
                  </h1>
                  <p className="text-white text-xl md:text-2xl font-bold max-w-2xl mb-12 border-l-4 pl-6" style={{ borderColor: siteConfig.accentColor }}>
                    {siteConfig.slogan}
                  </p>
                  <div className="flex flex-wrap gap-5">
                    <button onClick={() => setActiveTab('contact')} className="px-10 py-6 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl" style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}>Lancer un projet</button>
                    <button onClick={() => setActiveTab('projects')} className="px-10 py-6 rounded-full font-black text-[11px] uppercase tracking-widest border border-white text-white backdrop-blur-sm hover:bg-white/10 transition-all">Nos Réalisations</button>
                  </div>
                </div>
              </div>
            </section>

            {/* SERVICES PREVIEW */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
               <h2 className="text-4xl font-black italic text-white mb-16 uppercase">Expertise <span style={{ color: siteConfig.accentColor }}>Clé.</span></h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                    { title: "Génie Civil", icon: "fa-helmet-safety", desc: "Routes, ponts et infrastructures urbaines." },
                    { title: "Structure", icon: "fa-compass-drafting", desc: "Calculs de stabilité et audit technique." },
                    { title: "Location", icon: "fa-truck-fast", desc: "Parc matériel de pointe prêt à l'emploi." }
                  ].map((s, i) => (
                    <div key={i} className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:bg-slate-900 transition-colors group">
                      <i className={`fas ${s.icon} text-4xl mb-6 group-hover:scale-110 transition-transform`} style={{ color: siteConfig.accentColor }}></i>
                      <h3 className="text-xl font-black text-white uppercase italic">{s.title}</h3>
                      <p className="text-slate-400 mt-4 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        )}

        {/* ONGLET EXPERTISE */}
        {activeTab === 'expertise' && (
           <div className="py-32 px-6 max-w-7xl mx-auto animate-fadeIn">
              <h2 className="text-5xl md:text-7xl font-black italic uppercase text-white mb-20 tracking-tighter">Notre <span style={{ color: siteConfig.accentColor }}>Savoir-Faire.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { t: "Bureau d'études", d: "Conception CAO/DAO, calculs de structures complexes et optimisation des matériaux.", i: "fa-pen-ruler" },
                  { t: "Suivi de Chantier", d: "Contrôle qualité rigoureux et respect strict des délais de livraison.", i: "fa-clipboard-check" },
                  { t: "VRD & Assainissement", d: "Voiries et Réseaux Divers, drainage et traitement des eaux.", i: "fa-faucet-drip" },
                  { t: "Audit & Diagnostic", d: "Expertise de solidité sur bâtiments existants et conseil en réhabilitation.", i: "fa-magnifying-glass-chart" }
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900/60 p-12 rounded-[3.5rem] border border-white/5 flex gap-8">
                     <i className={`fas ${item.i} text-5xl`} style={{ color: siteConfig.accentColor }}></i>
                     <div>
                        <h3 className="text-2xl font-black text-white italic uppercase mb-4">{item.t}</h3>
                        <p className="text-slate-400 leading-relaxed italic">{item.d}</p>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        )}

        {/* ONGLET PROJETS */}
        {activeTab === 'projects' && (
           <div className="py-32 px-6 max-w-7xl mx-auto animate-fadeIn">
              <h2 className="text-5xl font-black italic uppercase text-white mb-20">Projets <span style={{ color: siteConfig.accentColor }}>Réalisés.</span></h2>
              <div className="grid grid-cols-1 gap-12">
                 {projects.map(p => (
                   <div key={p.id} className="bg-slate-900/40 rounded-[3rem] overflow-hidden border border-white/5 flex flex-col md:flex-row gap-10 group">
                      <div className="md:w-1/3 h-80 overflow-hidden">
                        <img src={p.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                      </div>
                      <div className="flex-grow p-10 flex flex-col justify-center">
                         <p className="text-[10px] font-black uppercase mb-2" style={{ color: siteConfig.accentColor }}>{p.status}</p>
                         <h3 className="text-4xl font-black text-white italic uppercase mb-6">{p.name}</h3>
                         <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                            <div>
                               <p className="text-[10px] uppercase text-slate-500 font-black mb-1">Budget</p>
                               <p className="text-xl font-bold text-white font-mono">{p.budget.toLocaleString()} FCFA</p>
                            </div>
                            <div>
                               <p className="text-[10px] uppercase text-slate-500 font-black mb-1">Localisation</p>
                               <p className="text-xl font-bold text-white italic">{p.location}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}

        {/* ONGLET GALERIE */}
        {activeTab === 'gallery' && (
           <div className="py-32 px-6 max-w-7xl mx-auto animate-fadeIn">
              <h2 className="text-5xl font-black italic uppercase text-white mb-20">Médiathèque <span style={{ color: siteConfig.accentColor }}>Technique.</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {galleryItems.map(item => (
                   <div key={item.id} className="group relative rounded-[2rem] overflow-hidden border border-white/10 aspect-square">
                      <img src={item.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                      <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-8 text-center">
                         <p className="text-[8px] font-black uppercase text-slate-500 mb-2">{item.category}</p>
                         <p className="text-white font-black italic uppercase text-lg">{item.title}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}

        {/* ONGLET LOCATION */}
        {activeTab === 'rentals' && (
           <div className="py-32 px-6 max-w-7xl mx-auto animate-fadeIn">
              <h2 className="text-5xl font-black italic uppercase text-white mb-20">Parc <span style={{ color: siteConfig.accentColor }}>Matériel.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {rentalItems.map(r => (
                   <div key={r.id} className="bg-slate-900/60 p-12 rounded-[3.5rem] border border-white/5 flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8" style={{ color: siteConfig.accentColor }}>
                        <i className={`fas ${r.icon} text-4xl`}></i>
                      </div>
                      <h3 className="text-2xl font-black text-white italic uppercase mb-4">{r.name}</h3>
                      <p className="text-slate-400 mb-8 italic text-sm">{r.desc}</p>
                      <p className="text-xl font-black text-white font-mono mb-8">{r.price}</p>
                      <button onClick={() => setActiveTab('contact')} className="w-full py-4 rounded-xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Demander un Devis</button>
                   </div>
                 ))}
              </div>
           </div>
        )}

        {/* ONGLET CONTACT */}
        {activeTab === 'contact' && (
           <div className="py-32 px-6 max-w-7xl mx-auto animate-fadeIn">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-black italic uppercase text-white mb-10 text-center">Contact <span style={{ color: siteConfig.accentColor }}>Direct.</span></h2>
                {showSuccess && <div className="bg-green-500 text-black p-6 rounded-2xl font-black text-[10px] uppercase tracking-widest mb-10 text-center">Message envoyé avec succès !</div>}
                <form onSubmit={handleContactSubmit} className="bg-slate-900/40 p-12 rounded-[3rem] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input required placeholder="Nom Complet" className="bg-slate-950 p-5 rounded-2xl text-white border border-white/10" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                  <input required type="email" placeholder="Email" className="bg-slate-950 p-5 rounded-2xl text-white border border-white/10" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                  <textarea required rows={4} className="md:col-span-2 bg-slate-950 p-5 rounded-2xl text-white border border-white/10" placeholder="Décrivez votre projet..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                  <button type="submit" className="md:col-span-2 py-6 rounded-2xl font-black text-[12px] uppercase tracking-widest" style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}>Envoyer le message</button>
                </form>
              </div>
           </div>
        )}

        {/* ONGLET ADMIN */}
        {activeTab === 'admin' && (
          <div className="px-6 py-32 max-w-7xl mx-auto">
            {!isLoggedIn ? (
              <div className="max-w-md mx-auto bg-slate-950 p-12 rounded-[3rem] border border-white/5 shadow-2xl">
                <h2 className="text-2xl font-black text-white italic uppercase mb-10 text-center">Accès <span style={{ color: siteConfig.accentColor }}>Système.</span></h2>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-slate-500 uppercase ml-2 tracking-widest">Identifiant</label>
                    <input name="email" type="email" placeholder="admin@piconstruction.com" className="w-full bg-slate-900 p-5 rounded-2xl text-white border border-white/5" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-slate-500 uppercase ml-2 tracking-widest">Mot de passe</label>
                    <input name="password" type="password" placeholder="admin" className="w-full bg-slate-900 p-5 rounded-2xl text-white border border-white/5" />
                  </div>
                  <button type="submit" className="w-full py-5 rounded-2xl font-black text-[11px] uppercase shadow-lg" style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}>Ouvrir la session</button>
                </form>
              </div>
            ) : (
              <AdminDashboard 
                projects={projects} setProjects={setProjects} 
                gallery={galleryItems} setGallery={setGalleryItems} 
                rentals={rentalItems} setRentals={setRentalItems} 
                messages={messages} setMessages={setMessages} 
                config={siteConfig} setConfig={setConfig} 
                logout={() => setIsLoggedIn(false)} 
              />
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slowZoom { animation: slowZoom 20s infinite alternate ease-in-out; }
      `}</style>
    </Layout>
  );
};

export default App;
