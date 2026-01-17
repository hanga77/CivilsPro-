
import React, { useState } from 'react';
import { SiteConfig } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  config: SiteConfig;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isAdmin, setIsAdmin, config }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const LogoIcon = () => (
    <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center border-b-4 shadow-xl overflow-hidden transition-all group-hover:scale-110" style={{ borderBottomColor: config.accentColor }}>
       {config.logoUrl ? (
         <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
       ) : (
         <div className="flex flex-col items-center">
          <span className="text-xl md:text-2xl font-black text-slate-900 leading-none">π</span>
          <div className="h-0.5 w-3 md:w-4 rounded-full mt-0.5" style={{ backgroundColor: config.accentColor }}></div>
         </div>
       )}
    </div>
  );

  const navItems = [
    { id: 'home', label: 'ACCUEIL', icon: 'fa-house' },
    { id: 'expertise', label: 'EXPERTISE', icon: 'fa-microchip' },
    { id: 'projects', label: 'SERVICES', icon: 'fa-helmet-safety' },
    { id: 'gallery', label: 'GALERIE', icon: 'fa-images' },
    { id: 'rentals', label: 'LOCATIONS', icon: 'fa-truck-pickup' },
    { id: 'contact', label: 'CONTACT', icon: 'fa-paper-plane' },
    { id: 'admin', label: 'SYSTÈME', icon: 'fa-lock' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(${config.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${config.accentColor} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <header className="fixed top-0 left-0 right-0 z-[100] p-3 md:p-6">
        <nav className="max-w-7xl mx-auto bg-slate-950/60 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-[2rem] shadow-2xl px-4 md:px-6 py-2 md:py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3 md:space-x-4 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <LogoIcon />
            <div className="flex flex-col">
              <span className="text-sm md:text-xl font-black tracking-tighter text-white leading-none">
                {config.companyName}<span style={{ color: config.accentColor }}>+</span>
              </span>
              <span className="text-[6px] md:text-[7px] font-black tracking-[0.4em] text-slate-500 uppercase mt-1">Ingéniosité & Mobilité</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-xl text-[9px] font-black tracking-widest transition-all ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                style={activeTab === tab.id ? { backgroundColor: `${config.accentColor}22`, border: `1px solid ${config.accentColor}44` } : {}}
              >
                <i className={`fas ${tab.icon} text-[10px] opacity-50`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-xl border border-white/10">
            <i className={`fas ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>

          <div className="hidden md:flex items-center">
            <a href={`https://wa.me/${config.socialLinks.whatsapp.replace(/\D/g,'')}`} className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all">
               <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.accentColor }}></div>
               <span className="text-[10px] font-black text-white uppercase">WhatsApp Direct</span>
            </a>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-4 right-4 bg-slate-950 border border-white/10 rounded-2xl p-4 shadow-3xl animate-fadeIn z-[110]">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 text-[8px] font-black tracking-widest space-y-2"
                  style={activeTab === tab.id ? { border: `1px solid ${config.accentColor}`, color: config.accentColor } : {}}
                >
                  <i className={`fas ${tab.icon} text-lg opacity-70`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow relative z-10 overflow-x-hidden">
        {children}
      </main>

      <footer className="relative z-10 bg-slate-950 pt-16 md:pt-32 pb-8 md:pb-12 border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 blur-[120px] opacity-10 rounded-full" style={{ backgroundColor: config.accentColor }}></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-6 uppercase leading-tight">
              Ingéniosité <br/><span style={{ color: config.accentColor }}>& Perspicacité.</span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-md font-medium italic border-l-2 pl-4" style={{ borderColor: config.accentColor }}>
              {config.footerAbout}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <h4 className="text-[9px] font-black tracking-[0.4em] uppercase opacity-40">Unités Mobiles</h4>
            {config.contactPhones.map((phone, idx) => (
              <div key={idx}>
                <p className="text-[8px] text-slate-500 font-black mb-1">DÉPLOIEMENT {idx + 1}</p>
                <p className="text-white font-bold tracking-tighter text-base md:text-lg">{phone}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-[9px] font-black tracking-[0.4em] uppercase mb-8 opacity-40">Social</h4>
            <div className="flex space-x-3">
               {Object.entries(config.socialLinks).map(([key, url]) => (
                 url && (
                   <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 border border-white/5 transition-all">
                      <i className={`fab fa-${key === 'whatsapp' ? 'whatsapp' : key} text-base md:text-lg`}></i>
                   </a>
                 )
               ))}
            </div>
            <button onClick={() => setActiveTab('contact')} className="mt-8 w-full md:w-auto inline-flex items-center justify-center space-x-3 text-[9px] font-black uppercase tracking-widest py-4 px-6 rounded-xl border border-white/10 bg-white/5">
              <span style={{ color: config.accentColor }}>EXPERTISE-CONSEIL</span>
              <i className="fa-solid fa-paper-plane" style={{ color: config.accentColor }}></i>
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24 pt-8 border-t border-white/5 text-center md:text-left">
          <p className="text-[7px] md:text-[8px] font-black tracking-[0.3em] uppercase opacity-40">
            © {new Date().getFullYear()} {config.companyName} {config.companySuffix}. TOUS DROITS RÉSERVÉS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
