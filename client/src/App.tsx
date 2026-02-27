
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import { Project, GalleryItem, RentalItem, SiteConfig, ContactMessage, Industry } from './types';
import { INITIAL_PROJECTS, INDUSTRIES as INITIAL_INDUSTRIES, COLORS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const [siteConfig, setConfig] = useState<SiteConfig>({
    companyName: 'PI-CONSTRUCTION',
    companySuffix: 'BTP SARL',
    slogan: 'L\'EXCELLENCE TECHNIQUE AU SERVICE DE L\'INFRASTRUCTURE.',
    subSlogan: 'Ingénierie de précision, maîtrise du béton armé et solutions de construction durable pour les défis de demain.',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/4322/4322992.png',
    accentColor: '#FFB81C', 
    primaryColor: '#001E42',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070',
    contactPhones: ['(+237) 671 34 54 41', '(+237) 699 46 63 21'],
    contactEmail: 'contact@piconstruction.cm',
    contactLocation: 'Douala - Yaoundé - Déploiement Afrique Centrale',
    footerAbout: 'PI-CONSTRUCTION BTP SARL est un acteur majeur du Génie Civil, spécialisé dans les infrastructures lourdes, le bâtiment industriel et l\'expertise en structures complexes.',
    stats: {
      projectsCount: '150+',
      expertiseYears: '12 ANS',
      teamSize: '45 EXPERTS'
    },
    socialLinks: {
      facebook: 'https://facebook.com/piconstruction',
      linkedin: 'https://linkedin.com/company/piconstruction',
      instagram: '',
      whatsapp: '237671345441'
    }
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [industries, setIndustries] = useState<Industry[]>(INITIAL_INDUSTRIES);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { id: '1', category: 'Ingénierie', url: 'https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=80&w=800', title: 'Bureau d\'études' }
  ]);

  const [rentalItems, setRentalItems] = useState<RentalItem[]>([
    { id: '1', name: "Pelle Hydraulique CAT 320", icon: "fa-tractor", price: "450.000 FCFA/Jour", desc: "Capacité godet 1.2m³, idéale pour terrassements massifs." },
    { id: '2', name: "Niveleuse 140K", icon: "fa-shovels", price: "600.000 FCFA/Jour", desc: "Précision de nivellement pour infrastructures routières." },
    { id: '3', name: "Camion Malaxeur 8m³", icon: "fa-truck-droplet", price: "180.000 FCFA/Rotation", desc: "Transport et brassage de béton prêt à l'emploi." },
    { id: '4', name: "Grue à Tour 50m", icon: "fa-building", price: "Sur Devis", desc: "Levage lourd pour chantiers de bâtiments R+10 et plus." }
  ]);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Demande de Devis', message: '' });
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
    setContactForm({ name: '', email: '', subject: 'Demande de Devis', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailInput = (e.target as any).email.value;
    const passwordInput = (e.target as any).password.value;
    if (emailInput === 'admin@piconstruction.cm' && passwordInput === 'admin2025') {
      setIsLoggedIn(true);
    } else {
      alert("Identifiants incorrects (admin@piconstruction.cm / admin2025)");
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isLoggedIn} setIsAdmin={setIsLoggedIn} config={siteConfig}>
      
      {activeTab === 'home' && (
        <div className="animate-fadeIn">
          {/* HERO SECTION */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#001E42]">
            <div className="absolute inset-0 z-0">
              <img src={siteConfig.heroImage} className="w-full h-full object-cover opacity-60 scale-105 animate-slowZoom" alt="Hero" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001E42] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-[0.9] mb-8 uppercase">
                  {siteConfig.slogan.split(' ').slice(0, -1).join(' ')} <span className="text-[#FFB81C]">{siteConfig.slogan.split(' ').slice(-1)}</span>
                </h1>
                <p className="text-slate-200 text-xl md:text-2xl font-bold max-w-2xl mb-12 border-l-4 border-[#FFB81C] pl-6 leading-relaxed">
                  {siteConfig.subSlogan}
                </p>
                <div className="flex flex-wrap gap-5">
                  <button onClick={() => setActiveTab('contact')} className="px-12 py-6 bg-[#FFB81C] text-[#001E42] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1">Consulter un Expert</button>
                  <button onClick={() => setActiveTab('projects')} className="px-12 py-6 border-2 border-white text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-[#001E42] transition-all transform hover:-translate-y-1">Nos Projets</button>
                </div>
              </div>
            </div>
          </section>

          {/* STATS STRIP */}
          <section className="relative z-20 -mt-20 max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 shadow-2xl">
               {Object.entries(siteConfig.stats).map(([key, val]) => (
                 <div key={key} className="bg-white p-12 flex flex-col items-center justify-center text-center group hover:bg-[#FFB81C] transition-colors duration-500">
                    <p className="text-5xl font-black text-[#001E42] italic mb-2 tracking-tighter">{val}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-[#001E42]">{key === 'projectsCount' ? 'Projets Réalisés' : key === 'expertiseYears' ? 'Années d\'Expérience' : 'Ingénieurs & Experts'}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* QUICK EXPERTISE PREVIEW */}
          <section className="py-32 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-6">À Propos de nous</h4>
                    <h2 className="text-5xl md:text-7xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none mb-10">Bâtir l'indestructible avec <span className="text-[#FFB81C]">rigueur.</span></h2>
                    <p className="text-slate-500 text-lg font-bold leading-relaxed mb-10">
                       PI-CONSTRUCTION est née de la volonté de doter l'Afrique centrale d'une ingénierie de classe mondiale. Nous maîtrisons chaque étape du cycle de vie d'une structure : de l'étude géotechnique initiale à la réception définitive.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="border-l-2 border-[#FFB81C] pl-6">
                          <p className="text-xl font-black text-[#001E42] uppercase italic">Sécurité</p>
                          <p className="text-xs text-slate-400 font-bold uppercase">Tolérance Zéro Incident</p>
                       </div>
                       <div className="border-l-2 border-[#FFB81C] pl-6">
                          <p className="text-xl font-black text-[#001E42] uppercase italic">Précision</p>
                          <p className="text-xs text-slate-400 font-bold uppercase">Normes ISO & Eurocodes</p>
                       </div>
                    </div>
                 </div>
                 <div className="relative">
                    <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000" className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Work" />
                    <div className="absolute -bottom-10 -left-10 bg-[#FFB81C] p-10 hidden md:block rounded-xl shadow-xl">
                       <p className="text-4xl font-black text-[#001E42] italic">100%</p>
                       <p className="text-[8px] font-black uppercase tracking-widest text-[#001E42]">Projets Livrés à Temps</p>
                    </div>
                 </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ONGLET EXPERTISE / INDUSTRIES */}
      {activeTab === 'expertise' && (
        <div className="pt-40 pb-32 bg-[#001E42] min-h-screen animate-fadeIn">
          <div className="max-w-[1400px] mx-auto px-6">
            <header className="mb-24 text-center">
              <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Capacités de l'Entreprise</h4>
              <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">Nos Métiers du <span className="text-[#FFB81C]">Génie Civil.</span></h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {industries.map((ind) => (
                <div key={ind.id} className="group relative h-[450px] overflow-hidden bg-slate-900 rounded-3xl border border-white/5 hover:border-[#FFB81C]/50 transition-all duration-500">
                  <img src={ind.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" alt={ind.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001E42] via-[#001E42]/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-12">
                    <div className="w-16 h-16 bg-[#FFB81C] flex items-center justify-center text-[#001E42] text-3xl mb-8 transform -rotate-6 group-hover:rotate-0 transition-all">
                      <i className={`fas ${ind.icon}`}></i>
                    </div>
                    <h3 className="text-4xl font-black text-white italic uppercase mb-4 tracking-tighter leading-none">{ind.title}</h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      {ind.description}
                    </p>
                    <button onClick={() => setActiveTab('contact')} className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest flex items-center gap-4 group-hover:gap-6 transition-all">
                       ÉTUDIER VOTRE BESOIN <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ONGLET RÉALISATIONS */}
      {activeTab === 'projects' && (
        <div className="pt-40 pb-32 bg-slate-50 min-h-screen animate-fadeIn">
          <div className="max-w-[1400px] mx-auto px-6">
             <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
               <div>
                 <h2 className="text-6xl font-black italic text-[#001E42] uppercase tracking-tighter mb-4 leading-none">Portfolio <br/><span className="text-[#FFB81C]">Infrastructures.</span></h2>
                 <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Preuves tangibles de notre expertise sur le terrain.</p>
               </div>
               <div className="flex gap-4">
                  <button className="px-6 py-3 bg-[#001E42] text-white font-black text-[10px] uppercase tracking-widest">Tout</button>
                  <button className="px-6 py-3 bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest border border-slate-200">En Cours</button>
                  <button className="px-6 py-3 bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest border border-slate-200">Terminés</button>
               </div>
             </header>
             
             <div className="grid grid-cols-1 gap-20">
                {projects.map((p, idx) => (
                  <div key={p.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white group shadow-xl overflow-hidden rounded-[2rem]`}>
                     <div className="lg:w-1/2 h-[500px] overflow-hidden relative">
                       <img src={p.thumbnail} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={p.name} />
                       <div className="absolute top-8 left-8 bg-[#FFB81C] text-[#001E42] px-6 py-2 text-[10px] font-black uppercase tracking-widest">{p.sector}</div>
                     </div>
                     <div className="flex-grow p-16 flex flex-col justify-center bg-white">
                        <div className="flex items-center gap-6 mb-8">
                           <span className={`px-4 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${
                             p.status === 'Terminé' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                           }`}>{p.status}</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Démarrage : {p.startDate}</span>
                        </div>
                        <h3 className="text-5xl font-black text-[#001E42] italic uppercase mb-8 tracking-tighter leading-tight">{p.name}</h3>
                        <p className="text-slate-500 mb-12 max-w-xl text-lg italic leading-relaxed">"{p.description}"</p>
                        
                        <div className="grid grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                           <div className="flex flex-col">
                              <span className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">Maître d'Ouvrage</span>
                              <span className="text-sm font-black text-[#001E42] uppercase">{p.client}</span>
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">Localisation</span>
                              <span className="text-sm font-black text-[#001E42] uppercase">{p.location}</span>
                           </div>
                        </div>
                        <button className="mt-12 text-[10px] font-black text-[#001E42] uppercase tracking-[0.2em] underline hover:text-[#FFB81C] transition-all">Consulter la fiche technique</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ONGLET LOCATION MATÉRIEL */}
      {activeTab === 'rentals' && (
        <div className="pt-40 pb-32 bg-[#020617] min-h-screen animate-fadeIn text-white">
          <div className="max-w-[1400px] mx-auto px-6">
             <div className="text-center mb-24">
                <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Parc Engins</h4>
                <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none mb-8">Matériel de <span className="text-[#FFB81C]">Haute Performance.</span></h2>
                <p className="text-slate-400 max-w-2xl mx-auto font-bold">Disponibilité immédiate de machines récentes, entretenues selon les standards constructeurs pour garantir zéro arrêt chantier.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
                {rentalItems.map(r => (
                  <div key={r.id} className="bg-[#020617] p-12 flex flex-col items-center text-center hover:bg-[#001E42] transition-colors group">
                     <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-10 group-hover:bg-[#FFB81C] transition-all duration-500">
                        <i className={`fas ${r.icon} text-4xl text-[#FFB81C] group-hover:text-[#001E42]`}></i>
                     </div>
                     <h3 className="text-xl font-black italic uppercase mb-4 tracking-tighter h-12 flex items-center">{r.name}</h3>
                     <p className="text-slate-400 mb-10 text-[10px] font-bold uppercase tracking-widest italic h-16">{r.desc}</p>
                     <p className="text-2xl font-black text-white mb-10 tracking-tighter">{r.price}</p>
                     <button onClick={() => setActiveTab('contact')} className="w-full py-5 bg-[#FFB81C] text-[#001E42] font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all transform group-hover:-translate-y-2">Louer cet engin</button>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ONGLET CONTACT & ADMIN (Restent identiques mais adaptés visuellement) */}
      {activeTab === 'contact' && (
        <div className="pt-40 pb-32 bg-white animate-fadeIn">
           <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-3 gap-20">
              <div className="lg:col-span-1">
                 <h2 className="text-6xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none mb-10">Parlons <span className="text-[#FFB81C]">Technique.</span></h2>
                 <p className="text-slate-500 font-bold mb-10">Nos bureaux d'études sont ouverts du Lundi au Vendredi de 8h à 17h.</p>
                 <div className="space-y-8">
                    {siteConfig.contactPhones.map((p, i) => (
                       <div key={i} className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-[#001E42] rounded-xl"><i className="fas fa-phone"></i></div>
                          <span className="text-xl font-black text-[#001E42]">{p}</span>
                       </div>
                    ))}
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-[#001E42] rounded-xl"><i className="fas fa-envelope"></i></div>
                       <span className="text-lg font-black text-[#001E42] uppercase">{siteConfig.contactEmail}</span>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-2">
                {showSuccess && <div className="bg-green-500 text-white p-6 rounded-2xl font-black text-xs uppercase tracking-widest mb-10 text-center shadow-xl">Votre demande a été enregistrée. Un ingénieur vous recontactera sous 24h.</div>}
                <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-16 border border-slate-100 rounded-[2rem] shadow-sm">
                  <input required placeholder="NOM DE VOTRE ENTITÉ" className="bg-white p-6 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C] rounded-xl" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                  <input required type="email" placeholder="EMAIL DE CONTACT" className="bg-white p-6 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C] rounded-xl" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                  <select className="md:col-span-2 bg-white p-6 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C] rounded-xl" value={contactForm.subject} onChange={e => setContactForm({...contactForm, subject: e.target.value})}>
                    <option>Expertise Structurelle</option>
                    <option>Construction Bâtiment</option>
                    <option>Infrastructures Routières</option>
                    <option>Location Engins Lourds</option>
                    <option>Audit de Chantier</option>
                  </select>
                  <textarea required rows={6} className="md:col-span-2 bg-white p-6 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C] rounded-xl" placeholder="DESCRIPTIF SOMMAIRE DE VOS BESOINS..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                  <button type="submit" className="md:col-span-2 py-8 bg-[#001E42] text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FFB81C] hover:text-[#001E42] transition-all shadow-xl rounded-xl">Lancer la consultation</button>
                </form>
              </div>
           </div>
        </div>
      )}

      {/* ONGLET ADMIN */}
      {activeTab === 'admin' && (
        <div className="pt-40 pb-32 bg-slate-50 min-h-screen">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto bg-white p-12 border border-slate-200 shadow-2xl rounded-[2rem]">
              <h2 className="text-3xl font-black text-[#001E42] italic uppercase mb-10 text-center tracking-tighter">Accès <span className="text-[#FFB81C]">Ingénieur.</span></h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <input name="email" type="email" placeholder="ADMIN@PICONSTRUCTION.CM" className="w-full bg-slate-50 p-6 text-xs font-black border border-slate-200 rounded-xl" />
                <input name="password" type="password" placeholder="••••••••" className="w-full bg-slate-50 p-6 text-xs font-black border border-slate-200 rounded-xl" />
                <button type="submit" className="w-full py-6 bg-[#001E42] text-white font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#FFB81C] hover:text-[#001E42] transition-all rounded-xl">Entrer dans le Dashboard</button>
              </form>
              <p className="mt-8 text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">Connexion chiffrée SSL v3</p>
            </div>
          ) : (
            <div className="max-w-[1400px] mx-auto px-6">
               <AdminDashboard 
                 projects={projects} setProjects={setProjects} 
                 industries={industries} setIndustries={setIndustries}
                 gallery={galleryItems} setGallery={setGalleryItems} 
                 rentals={rentalItems} setRentals={setRentalItems} 
                 messages={messages} setMessages={setMessages} 
                 config={siteConfig} setConfig={setConfig} 
                 logout={() => setIsLoggedIn(false)} 
               />
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        .animate-slowZoom { animation: slowZoom 30s infinite alternate ease-in-out; }
      `}</style>
    </Layout>
  );
};

export default App;
