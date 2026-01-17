
import React, { useState, useCallback, useMemo } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import { Project, GalleryItem, RentalItem, SiteConfig } from './types';
import { INITIAL_PROJECTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    companyName: 'PI-CONSTRUCTION',
    companySuffix: 'BTP SARL',
    slogan: 'L’INGÉNIERIE INGÉNIEUSE & RÉACTIVE',
    logoUrl: '',
    accentColor: '#fbbf24', 
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070',
    contactPhones: ['(+237) 671 34 54 41', '(+237) 699 46 63 21'],
    contactLocation: 'Unité Mobile de Génie Civil\nDéploiement National (Douala - Yaoundé)',
    footerAbout: 'PI-CONSTRUCTION BTP SARL est une jeune structure portée par des experts hautement qualifiés. Créativité, ingéniosité et perspicacité guident chacune de nos interventions pour une satisfaction garantie.',
    socialLinks: {
      facebook: 'https://facebook.com/piconstruction',
      linkedin: 'https://linkedin.com/company/piconstruction',
      instagram: '',
      whatsapp: '+237671345441'
    }
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { id: '1', category: 'Ingénierie', url: 'https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=80&w=800', title: 'Bureau d\'études mobile' },
    { id: '2', category: 'Matériel', url: 'https://images.unsplash.com/photo-1579362391512-972109869389?auto=format&fit=crop&q=80&w=800', title: 'Équipements de pointe' },
    { id: '3', category: 'Chantier', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800', title: 'Mise en œuvre agile' },
    { id: '4', category: 'Ingénierie', url: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800', title: 'Calculs de structures' },
    { id: '5', category: 'Matériel', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', title: 'Logistique réactive' },
    { id: '6', category: 'Chantier', url: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800', title: 'Expertise terrain' },
  ]);

  const [rentalItems, setRentalItems] = useState<RentalItem[]>([
    { id: '1', name: "Pelle Hydraulique Moderne", icon: "fa-tractor", price: "Sur Devis", desc: "Équipement de pointe pour vos terrassements." },
    { id: '2', name: "Logistique de Chantier", icon: "fa-truck-fast", price: "Sur Devis", desc: "Réactivité et professionnalisme garantis." },
    { id: '3', name: "Appareillage de Mesure", icon: "fa-compass", price: "À la journée", desc: "Précision millimétrée par nos experts." }
  ]);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'admin@piconstruction.com' && loginForm.password === 'admin') {
      setIsLoggedIn(true);
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isLoggedIn} setIsAdmin={setIsLoggedIn} config={siteConfig}>
      <div className="pt-32 pb-20">
        {activeTab === 'home' && (
          <div className="animate-fadeIn space-y-32">
            <section className="px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 relative z-10">
                  <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: siteConfig.accentColor }}></span>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">INGÉNIOSITÉ & PERSO QUALIFIÉ</span>
                  </div>
                  <h1 className="text-6xl md:text-[7.5rem] font-black text-white italic tracking-tighter leading-[0.8] mb-10 uppercase">
                    BÂTIR <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-transparent" style={{ WebkitTextStroke: `1px ${siteConfig.accentColor}` }}>L'EXCEPTION.</span>
                  </h1>
                  <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-xl mb-12 leading-relaxed italic border-l-4 pl-6" style={{ borderColor: siteConfig.accentColor }}>
                    "La mallette est notre bureau, le terrain est notre domaine. Créativité et perspicacité pour votre satisfaction."
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveTab('projects')} className="px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl transition-all hover:scale-105" style={{ backgroundColor: siteConfig.accentColor, color: '#000' }}>NOS SERVICES PRO</button>
                    <button onClick={() => setActiveTab('gallery')} className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white/10">VOIR LA GALERIE</button>
                  </div>
                </div>
                <div className="lg:col-span-5 relative h-[650px] rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl">
                  <img src={siteConfig.heroImage} className="w-full h-full object-cover grayscale-[20%]" alt="Ingénierie de précision" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 p-8 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 max-w-xs">
                    <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2">Notre ADN</p>
                    <p className="text-white font-bold italic uppercase tracking-tighter leading-tight">Flexibilité totale dans la mise en œuvre.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Atouts Maîtres */}
            <section className="max-w-7xl mx-auto px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-black text-white italic uppercase tracking-widest">NOS ATOUTS <span style={{ color: siteConfig.accentColor }}>MAÎTRES</span></h2>
                <div className="h-1 w-20 bg-yellow-500 mx-auto mt-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { title: 'CRÉATIVITÉ', icon: 'fa-lightbulb', text: 'Des solutions techniques ingénieuses pour chaque défi.' },
                  { title: 'QUALIFICATION', icon: 'fa-user-tie', text: 'Un personnel professionnel et hautement diplômé.' },
                  { title: 'MODERNITÉ', icon: 'fa-gears', text: 'Des équipements de pointe pour une précision optimale.' },
                  { title: 'FLEXIBILITÉ', icon: 'fa-shuffle', text: 'Une structure agile qui s\'adapte à vos urgences.' }
                ].map((atout, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-all text-center">
                    <i className={`fas ${atout.icon} text-3xl mb-6`} style={{ color: siteConfig.accentColor }}></i>
                    <h4 className="text-white font-black uppercase tracking-tighter mb-3">{atout.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{atout.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <span className="font-black text-[10px] uppercase tracking-[0.4em]" style={{ color: siteConfig.accentColor }}>Preuves en images</span>
                <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none mt-2">NOTRE GALERIE <br/><span style={{ color: siteConfig.accentColor }}>TECHNIQUE</span></h2>
              </div>
              <p className="text-slate-500 max-w-sm text-sm italic">"Chaque cliché témoigne de la rigueur de nos experts qualifiés et de la performance de nos équipements modernes."</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <div key={item.id} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: siteConfig.accentColor }}>{item.category}</span>
                    <h4 className="text-white text-xl font-black uppercase italic tracking-tighter">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rentals' && (
          <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
            <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-4">MATÉRIEL <span style={{ color: siteConfig.accentColor }}>MODERNE</span></h2>
            <p className="text-slate-500 mb-16 max-w-2xl text-lg font-medium italic">"Des équipements de pointe pour des chantiers performants."</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rentalItems.map(item => (
                <div key={item.id} className="bg-slate-950 border border-white/5 p-12 rounded-[3.5rem] flex flex-col items-center text-center group hover:scale-[1.02] transition-all">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-10" style={{ backgroundColor: `${siteConfig.accentColor}11`, color: siteConfig.accentColor }}>
                    <i className={`fas ${item.icon} text-4xl`}></i>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase italic mb-4 tracking-tighter">{item.name}</h3>
                  <p className="text-slate-500 text-sm mb-10 leading-relaxed italic">"{item.desc}"</p>
                  <a href={`https://wa.me/${siteConfig.socialLinks.whatsapp.replace(/\D/g,'')}?text=Bonjour Pi-Construction, j'ai besoin de vos équipements modernes pour : ${item.name}`} className="mt-auto w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2 bg-white text-slate-950 hover:bg-opacity-90 transition-all shadow-xl">
                    <i className="fab fa-whatsapp text-lg"></i>
                    <span>DEVIS IMMÉDIAT</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
           <div className="px-6 max-w-7xl mx-auto animate-fadeIn">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
               <div>
                 <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">INGÉNIOSITÉ <br/><span style={{ color: siteConfig.accentColor }}>APPLIQUÉE</span></h2>
               </div>
               <p className="text-slate-500 max-w-md text-right text-sm font-bold uppercase tracking-widest">Le personnel qualifié au service de vos infrastructures.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {projects.map(p => (
                 <div key={p.id} className="group bg-slate-900/20 rounded-[4rem] border border-white/5 overflow-hidden transition-all hover:border-white/20">
                   <div className="h-80 overflow-hidden relative">
                     <img src={p.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.name} />
                     <div className="absolute top-8 right-8">
                       <span className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-lg text-[9px] font-black uppercase text-white border border-white/10 tracking-widest">{p.status}</span>
                     </div>
                   </div>
                   <div className="p-12">
                     <h3 className="text-3xl font-black text-white italic uppercase mb-4 leading-none tracking-tighter">{p.name}</h3>
                     <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-6"><i className="fas fa-helmet-safety mr-2"></i> RÉALISÉ PAR NOTRE ÉQUIPE PRO</p>
                     <p className="text-slate-400 text-sm leading-relaxed max-w-md italic">Expertise technique de pointe et suivi rigoureux, même sans bureau fixe.</p>
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
                <form onSubmit={handleLogin} className="bg-slate-950 p-16 rounded-[4rem] border border-white/10 w-full max-w-md text-center shadow-3xl">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-10">
                    <i className="fas fa-lock text-3xl" style={{ color: siteConfig.accentColor }}></i>
                  </div>
                  <h2 className="text-2xl font-black text-white italic uppercase mb-10">PI-ADMIN LOGIN</h2>
                  <div className="space-y-4 text-left">
                    <label className="text-[9px] font-black uppercase text-slate-500 ml-4">Identifiant</label>
                    <input type="email" required className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-white" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} />
                    <label className="text-[9px] font-black uppercase text-slate-500 ml-4">Code d'accès</label>
                    <input type="password" required className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-white" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full text-slate-950 py-6 rounded-2xl font-black text-xs uppercase tracking-widest mt-12 transition-all hover:scale-105" style={{ backgroundColor: siteConfig.accentColor }}>DÉVERROUILLER LA CONSOLE</button>
                </form>
              </div>
            ) : (
              <AdminDashboard projects={projects} setProjects={setProjects} gallery={galleryItems} setGallery={setGalleryItems} rentals={rentalItems} setRentals={setRentalItems} config={siteConfig} setConfig={setSiteConfig} logout={() => setIsLoggedIn(false)} />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
