
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
    <div className="relative w-9 h-9 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center border-b-2 md:border-b-4 shadow-xl transition-all" style={{ borderBottomColor: config.accentColor }}>
       <div className="flex flex-col items-center">
        <span className="text-lg md:text-2xl font-black text-slate-900 leading-none">π</span>
        <div className="h-0.5 w-3 md:w-4 rounded-full mt-0.5" style={{ backgroundColor: config.accentColor }}></div>
       </div>
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
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(${config.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${config.accentColor} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
      </div>

      <header className="fixed top-0 left-0 right-0 z-[100] p-3 md:p-6">
        <nav className="max-w-7xl mx-auto bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-[2.5rem] px-4 md:px-6 py-2 md:py-3 flex justify-between items-center shadow-2xl">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <LogoIcon />
            <div className="flex flex-col">
              <span className="text-xs md:text-xl font-black tracking-tighter text-white leading-none uppercase">
                {config.companyName}
              </span>
              <span className="text-[5px] md:text-[7px] font-black tracking-[0.2em] md:tracking-[0.4em] text-slate-500 uppercase mt-1">ENGINEERING</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-xl text-[9px] font-black tracking-widest transition-all ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
                style={activeTab === tab.id ? { backgroundColor: `${config.accentColor}22` } : {}}
              >
                <i className={`fas ${tab.icon} text-[10px] opacity-50`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-xl border border-white/10 active:scale-95 transition-transform">
            <i className={`fas ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>

          {/* WhatsApp Direct Desktop */}
          <div className="hidden md:flex items-center">
            <a href={`https://wa.me/${config.socialLinks.whatsapp.replace(/\D/g,'')}`} target="_blank" className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-white/5">
               <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: config.accentColor }}></div>
               <span className="text-[9px] font-black text-white uppercase tracking-tighter">Support Direct</span>
            </a>
          </div>
        </nav>

        {/* Mobile Menu Overlay - Full Width and Smooth */}
        <div className={`lg:hidden fixed inset-0 top-[4.5rem] bg-[#020617]/95 backdrop-blur-xl transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'}`}>
          <div className="p-6 grid grid-cols-2 gap-3 overflow-y-auto max-h-[80vh]">
            {navItems.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black tracking-[0.2em] space-y-3 transition-all active:scale-95"
                style={activeTab === tab.id ? { border: `1px solid ${config.accentColor}`, backgroundColor: `${config.accentColor}11` } : {}}
              >
                <i className={`fas ${tab.icon} text-xl`} style={activeTab === tab.id ? { color: config.accentColor } : { color: '#64748b' }}></i>
                <span className={activeTab === tab.id ? 'text-white' : 'text-slate-400'}>{tab.label}</span>
              </button>
            ))}
            <div className="col-span-2 pt-6">
               <a 
                href={`https://wa.me/${config.socialLinks.whatsapp.replace(/\D/g,'')}`}
                className="flex items-center justify-center space-x-4 w-full py-5 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest"
                style={{ backgroundColor: config.accentColor }}
               >
                 <i className="fab fa-whatsapp text-lg"></i>
                 <span>WhatsApp Business</span>
               </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow relative z-10">
        {children}
      </main>

      <footer className="relative z-10 bg-slate-950 pt-16 md:pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter mb-6 uppercase">
              Ingéniosité <br/><span style={{ color: config.accentColor }}>& Perspicacité.</span>
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-medium italic border-l-2 pl-4" style={{ borderColor: config.accentColor }}>
              {config.footerAbout}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <h4 className="text-[8px] font-black tracking-[0.4em] uppercase opacity-40">Déploiement</h4>
            {config.contactPhones.map((phone, idx) => (
              <p key={idx} className="text-white font-bold tracking-tighter text-sm md:text-base">{phone}</p>
            ))}
          </div>

          <div>
            <h4 className="text-[8px] font-black tracking-[0.4em] uppercase mb-6 opacity-40">Social</h4>
            <div className="flex space-x-3">
               {['facebook', 'linkedin', 'whatsapp'].map((key) => (
                 <a key={key} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                    <i className={`fab fa-${key} text-base`}></i>
                 </a>
               ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center sm:text-left">
          <p className="text-[7px] font-black tracking-[0.3em] uppercase opacity-40 leading-loose">
            © {new Date().getFullYear()} {config.companyName} BTP SARL. WORLD-CLASS ENGINEERING.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
