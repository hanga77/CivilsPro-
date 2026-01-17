
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import { Project, GalleryItem, RentalItem, SiteConfig, ContactMessage } from './types';
import { INITIAL_PROJECTS } from './constants';

/**
 * Composant Racine PI-CONSTRUCTION
 * Centralise les données et la logique de modification de la plateforme.
 */
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  // Configuration globale du site (Logo, Couleurs, Textes)
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    companyName: 'PI-CONSTRUCTION',
    companySuffix: 'BTP SARL',
    slogan: 'L’INGÉNIERIE INGÉNIEUSE & RÉACTIVE',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/4322/4322992.png', // Logo par défaut
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
    { id: '2', name: "Camion Benne", icon: "fa-truck-fast", price: "120.000 FCFA/Voyage", desc: "Logistique de chantier réactive." }
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
      alert("Identifiants incorrects.");
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isLoggedIn} setIsAdmin={setIsLoggedIn} config={siteConfig}>
      <div className="pt-16 lg:pt-0">
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* HERO RESTORATION : Correction de la visibilité de l'image */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
              <div className="absolute inset-0 z-0">
                <img 
                  src={siteConfig.heroImage} 
                  className="w-full h-full object-cover scale-105 animate-slowZoom" 
                  alt="Bannière PI-CONSTRUCTION" 
                />
                {/* Overlay optimisé pour voir l'image tout en lisant le texte */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-[#020617]/20"></div>
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
                  <div className="flex gap-5">
                    <button onClick={() => setActiveTab('contact')} className="px-10 py-6 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl" style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}>Lancer un projet</button>
                    <button onClick={() => setActiveTab('projects')} className="px-10 py-6 rounded-full font-black text-[11px] uppercase tracking-widest border border-white text-white backdrop-blur-sm hover:bg-white/10 transition-all">Nos Réalisations</button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* ... Reste de l'accueil inchangé ... */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {rentalItems.slice(0, 3).map((item, i) => (
                    <div key={i} className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5">
                      <i className={`fas ${item.icon} text-4xl mb-6`} style={{ color: siteConfig.accentColor }}></i>
                      <h3 className="text-xl font-black text-white uppercase italic">{item.name}</h3>
                      <p className="text-slate-400 mt-4 text-sm">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        )}

        {/* ... Autres onglets ... */}
        {activeTab === 'admin' && (
          <div className="px-6 py-20 max-w-7xl mx-auto">
            {!isLoggedIn ? (
              <div className="max-w-md mx-auto bg-slate-950 p-12 rounded-[3rem] border border-white/5">
                <h2 className="text-2xl font-black text-white italic uppercase mb-10 text-center">Admin Access</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                  <input name="email" type="email" placeholder="Email" className="w-full bg-slate-900 p-5 rounded-2xl text-white border border-white/5" />
                  <input name="password" type="password" placeholder="Password" className="w-full bg-slate-900 p-5 rounded-2xl text-white border border-white/5" />
                  <button type="submit" className="w-full py-5 rounded-2xl font-black text-[11px] uppercase" style={{ backgroundColor: siteConfig.accentColor }}>Connecter</button>
                </form>
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

        {/* Rendu des onglets Projects/Gallery/Contact restants */}
        {activeTab === 'projects' && (
           <div className="py-24 px-6 max-w-7xl mx-auto space-y-12">
              <h2 className="text-5xl font-black italic uppercase text-white mb-16">PROJETS <span style={{ color: siteConfig.accentColor }}>ACTIFS.</span></h2>
              {projects.map(p => (
                <div key={p.id} className="bg-slate-900/40 p-8 rounded-[3rem] border border-white/5 flex flex-col md:flex-row gap-10">
                   <img src={p.thumbnail} className="w-full md:w-1/3 h-64 object-cover rounded-2xl" alt={p.name} />
                   <div className="flex-grow">
                      <h3 className="text-3xl font-black text-white italic uppercase mb-2">{p.name}</h3>
                      <p className="text-slate-500 font-mono mb-6">{p.location} | {p.client}</p>
                      <div className="flex gap-10">
                         <div>
                            <p className="text-[10px] uppercase font-black text-slate-500">Budget</p>
                            <p className="text-xl font-bold text-white">{p.budget.toLocaleString()} FCFA</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-black text-slate-500">Status</p>
                            <p className="text-xl font-bold" style={{ color: siteConfig.accentColor }}>{p.status}</p>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
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
