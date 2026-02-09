
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
    slogan: 'NOUS CONSTRUISONS L\'INFRASTRUCTURE DU FUTUR.',
    subSlogan: 'Ingénierie de pointe, précision technique et engagement pour un développement durable au Cameroun.',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/4322/4322992.png',
    accentColor: '#FFB81C', 
    primaryColor: '#001E42',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070',
    contactPhones: ['(+237) 671 34 54 41', '(+237) 699 46 63 21'],
    contactEmail: 'contact@piconstruction.cm',
    contactLocation: 'Douala - Yaoundé - Déploiement National',
    footerAbout: 'PI-CONSTRUCTION BTP SARL est un leader émergent dans le secteur du Génie Civil au Cameroun, offrant des solutions d\'ingénierie innovantes pour les projets les plus complexes.',
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
    { id: '1', name: "Pelle Hydraulique", icon: "fa-tractor", price: "450.000 FCFA/Jour", desc: "Performance garantie pour gros terrassement." },
    { id: '2', name: "Camion Benne 20m³", icon: "fa-truck-fast", price: "150.000 FCFA/Voyage", desc: "Logistique de chantier réactive." },
    { id: '3', name: "Niveleuse Cat", icon: "fa-shovels", price: "600.000 FCFA/Jour", desc: "Nivellement de précision." }
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
                  <button onClick={() => setActiveTab('contact')} className="px-12 py-6 bg-[#FFB81C] text-[#001E42] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1">Démarrer un Projet</button>
                  <button onClick={() => setActiveTab('projects')} className="px-12 py-6 border-2 border-white text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-[#001E42] transition-all transform hover:-translate-y-1">Nos Réalisations</button>
                </div>
              </div>
            </div>
          </section>

          {/* STATS SECTION */}
          <section className="relative z-20 -mt-20 max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
               {Object.entries(siteConfig.stats).map(([key, val]) => (
                 <div key={key} className="bg-white p-12 shadow-2xl flex flex-col items-center justify-center text-center group hover:bg-[#FFB81C] transition-colors duration-500">
                    <p className="text-5xl font-black text-[#001E42] italic mb-2 tracking-tighter">{val}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-[#001E42]">{key === 'projectsCount' ? 'Projets Livrés' : key === 'expertiseYears' ? 'D\'Expérience' : 'Experts à Bord'}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* INDUSTRIES PREVIEW */}
          <section className="py-32 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                <div>
                   <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Secteurs Stratégiques</h4>
                   <h2 className="text-5xl md:text-7xl font-black italic text-[#001E42] uppercase tracking-tighter">Nos <span className="text-[#FFB81C]">Champs</span> d'Action.</h2>
                </div>
                <button onClick={() => setActiveTab('expertise')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#001E42] mb-4">Voir toute l'expertise <i className="fas fa-arrow-right ml-2"></i></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {industries.slice(0, 3).map((ind) => (
                   <div key={ind.id} className="group relative h-[600px] overflow-hidden bg-slate-900">
                      <img src={ind.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001E42] to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-12">
                         <i className={`fas ${ind.icon} text-[#FFB81C] text-4xl mb-6`}></i>
                         <h3 className="text-3xl font-black text-white italic uppercase mb-4 tracking-tighter">{ind.title}</h3>
                         <p className="text-slate-300 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{ind.description}</p>
                         <button onClick={() => setActiveTab('expertise')} className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest flex items-center gap-3">
                            En savoir plus <span className="w-8 h-[1px] bg-[#FFB81C]"></span>
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ONGLET EXPERTISE / INDUSTRIES */}
      {activeTab === 'expertise' && (
        <div className="pt-40 pb-32 bg-[#001E42] min-h-screen animate-fadeIn">
          <div className="max-w-[1400px] mx-auto px-6">
            <header className="mb-24">
              <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Capacités Techniques</h4>
              <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter mb-8 leading-none">Domaines de <br/><span className="text-[#FFB81C]">Haute Précision.</span></h2>
              <p className="text-slate-400 max-w-2xl text-xl font-bold border-l-2 border-white/10 pl-8">
                Chez PI-CONSTRUCTION, nous ne nous contentons pas de bâtir. Nous concevons des écosystèmes résilients capables de supporter les défis de demain.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-20">
              {industries.map((ind, idx) => (
                <div key={ind.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
                  <div className="lg:w-1/2 aspect-video overflow-hidden relative shadow-2xl">
                    <img src={ind.imageUrl} className="w-full h-full object-cover" alt={ind.title} />
                    <div className="absolute top-0 right-0 bg-[#FFB81C] w-24 h-24 flex items-center justify-center text-[#001E42] text-4xl">
                      <i className={`fas ${ind.icon}`}></i>
                    </div>
                  </div>
                  <div className="lg:w-1/2 space-y-8">
                    <h3 className="text-5xl font-black italic text-white uppercase tracking-tighter">{ind.title}</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">{ind.description}</p>
                    <ul className="space-y-4">
                      {["Audit & Diagnostic", "Conception Structurelle", "Maîtrise d'Œuvre"].map((feature, i) => (
                        <li key={i} className="flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-widest">
                          <i className="fas fa-check text-[#FFB81C]"></i> {feature}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setActiveTab('contact')} className="px-10 py-5 bg-[#FFB81C] text-[#001E42] font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all">Démarrer une étude</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ONGLET PROJETS */}
      {activeTab === 'projects' && (
        <div className="pt-40 pb-32 bg-slate-50 min-h-screen animate-fadeIn">
          <div className="max-w-[1400px] mx-auto px-6">
             <header className="mb-20">
               <h2 className="text-6xl font-black italic text-[#001E42] uppercase tracking-tighter mb-4">Réalisations <span className="text-[#FFB81C]">Majeures.</span></h2>
               <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Aperçu de notre empreinte infrastructurelle au Cameroun.</p>
             </header>
             
             <div className="grid grid-cols-1 gap-12">
                {projects.map(p => (
                  <div key={p.id} className="bg-white flex flex-col lg:flex-row group border border-slate-100 hover:shadow-2xl transition-all overflow-hidden rounded-2xl">
                     <div className="lg:w-2/5 h-[450px] overflow-hidden relative">
                       <img src={p.thumbnail} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" alt={p.name} />
                       <div className="absolute top-6 left-6 px-4 py-2 bg-[#001E42] text-white text-[9px] font-black uppercase tracking-widest">{p.sector}</div>
                     </div>
                     <div className="flex-grow p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                           <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${
                             p.status === 'Terminé' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                           }`}>{p.status}</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.startDate}</span>
                        </div>
                        <h3 className="text-4xl font-black text-[#001E42] italic uppercase mb-6 tracking-tighter leading-tight">{p.name}</h3>
                        <p className="text-slate-500 mb-10 max-w-xl text-lg italic leading-relaxed">"{p.description}"</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                           <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Localisation</p>
                              <p className="text-sm font-bold text-[#001E42]">{p.location}</p>
                           </div>
                           <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Maître d'Ouvrage</p>
                              <p className="text-sm font-bold text-[#001E42]">{p.client}</p>
                           </div>
                           <div className="hidden md:block">
                              <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Budget Estimé</p>
                              <p className="text-sm font-bold text-[#FFB81C]">{p.budget.toLocaleString()} FCFA</p>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ONGLET LOCATION */}
      {activeTab === 'rentals' && (
        <div className="pt-40 pb-32 bg-[#001E42] min-h-screen animate-fadeIn text-white">
          <div className="max-w-[1400px] mx-auto px-6">
             <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-20 text-center">Logistique <span className="text-[#FFB81C]">Lourde.</span></h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                {rentalItems.map(r => (
                  <div key={r.id} className="bg-[#001E42] p-16 flex flex-col items-center text-center hover:bg-[#002855] transition-colors group">
                     <i className={`fas ${r.icon} text-6xl text-[#FFB81C] mb-10 group-hover:scale-110 transition-transform`}></i>
                     <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tighter">{r.name}</h3>
                     <p className="text-slate-400 mb-10 text-sm italic h-12">{r.desc}</p>
                     <p className="text-3xl font-black text-white mb-10 tracking-tighter">{r.price}</p>
                     <button onClick={() => setActiveTab('contact')} className="w-full py-5 bg-white text-[#001E42] font-black uppercase text-[10px] tracking-widest hover:bg-[#FFB81C] transition-all">Réserver l'engin</button>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ONGLET CONTACT */}
      {activeTab === 'contact' && (
        <div className="pt-40 pb-32 bg-white animate-fadeIn">
           <div className="max-w-[1000px] mx-auto px-6">
              <div className="text-center mb-20">
                 <h2 className="text-6xl font-black italic text-[#001E42] uppercase tracking-tighter mb-6">Contact <span className="text-[#FFB81C]">Opérationnel.</span></h2>
                 <p className="text-slate-500 font-bold max-w-xl mx-auto">Vous avez une vision ? Nous avons l'expertise technique pour la concrétiser. Nos équipes sont prêtes à se déployer.</p>
              </div>
              {showSuccess && <div className="bg-[#FFB81C] text-[#001E42] p-6 rounded-lg font-black text-xs uppercase tracking-widest mb-10 text-center animate-bounce shadow-xl">Message transmis avec succès à nos ingénieurs !</div>}
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-16 border border-slate-100 shadow-sm">
                <input required placeholder="NOM COMPLET" className="bg-white p-5 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C]" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                <input required type="email" placeholder="ADRESSE EMAIL" className="bg-white p-5 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C]" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                <select className="md:col-span-2 bg-white p-5 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C]" value={contactForm.subject} onChange={e => setContactForm({...contactForm, subject: e.target.value})}>
                   <option>Études & Conception</option>
                   <option>Construction & BTP</option>
                   <option>Location d'Engins</option>
                   <option>Audit Technique</option>
                </select>
                <textarea required rows={6} className="md:col-span-2 bg-white p-5 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C]" placeholder="DÉTAILS DU PROJET..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                <button type="submit" className="md:col-span-2 py-6 bg-[#001E42] text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FFB81C] hover:text-[#001E42] transition-all shadow-xl">Transmettre la requête</button>
              </form>
           </div>
        </div>
      )}

      {/* ONGLET ADMIN */}
      {activeTab === 'admin' && (
        <div className="pt-40 pb-32 bg-slate-50 min-h-screen">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto bg-white p-12 border border-slate-200 shadow-2xl">
              <h2 className="text-3xl font-black text-[#001E42] italic uppercase mb-10 text-center tracking-tighter">Accès <span className="text-[#FFB81C]">Sécurisé.</span></h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identifiant</label>
                  <input name="email" type="email" placeholder="admin@piconstruction.cm" className="w-full bg-slate-50 p-5 text-xs font-black border border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mot de passe</label>
                  <input name="password" type="password" placeholder="••••••••" className="w-full bg-slate-50 p-5 text-xs font-black border border-slate-200" />
                </div>
                <button type="submit" className="w-full py-6 bg-[#001E42] text-white font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#FFB81C] hover:text-[#001E42] transition-all">Authentification</button>
              </form>
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
