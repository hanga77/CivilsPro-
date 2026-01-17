
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

  // Logo dynamique utilisant logoUrl de la config
  const LogoIcon = () => (
    <div className="relative w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl transition-all border-b-4" style={{ borderBottomColor: config.accentColor }}>
       {config.logoUrl ? (
         <img src={config.logoUrl} className="w-full h-full object-contain" alt="Logo" />
       ) : (
         <span className="text-2xl font-black text-slate-900 leading-none">π</span>
       )}
    </div>
  );

  const navItems = [
    { id: 'home', label: 'ACCUEIL', icon: 'fa-house' },
    { id: 'expertise', label: 'EXPERTISE', icon: 'fa-microchip' },
    { id: 'projects', label: 'PROJETS', icon: 'fa-helmet-safety' },
    { id: 'gallery', label: 'GALERIE', icon: 'fa-images' },
    { id: 'rentals', label: 'LOCATION', icon: 'fa-truck-pickup' },
    { id: 'contact', label: 'CONTACT', icon: 'fa-paper-plane' },
    { id: 'admin', label: 'ADMIN', icon: 'fa-lock' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(${config.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${config.accentColor} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
      </div>

      <header className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6">
        <nav className="max-w-7xl mx-auto bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] px-6 py-3 flex justify-between items-center shadow-2xl">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <LogoIcon />
            <div className="flex flex-col">
              <span className="text-sm md:text-2xl font-black tracking-tighter text-white leading-none uppercase">
                {config.companyName}
              </span>
              <span className="text-[6px] md:text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase mt-1">ENGINEERING Excellence</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
                style={activeTab === tab.id ? { backgroundColor: `${config.accentColor}22` } : {}}
              >
                <i className={`fas ${tab.icon} opacity-50`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-12 h-12 flex items-center justify-center text-white bg-white/5 rounded-2xl border border-white/10">
            <i className={`fas ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 top-[5.5rem] bg-[#020617]/95 backdrop-blur-xl transition-all ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="p-8 grid grid-cols-2 gap-4">
            {navItems.map((tab) => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest gap-3" style={activeTab === tab.id ? { borderColor: config.accentColor, color: config.accentColor } : {}}>
                <i className={`fas ${tab.icon} text-xl`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 pt-20 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-black text-white italic tracking-tighter mb-6 uppercase">
              {config.companyName} <br/><span style={{ color: config.accentColor }}>{config.companySuffix}</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm italic border-l-2 pl-4" style={{ borderColor: config.accentColor }}>
              {config.footerAbout}
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-4">
             {config.contactPhones.map((p, i) => (
               <p key={i} className="text-white font-bold text-lg">{p}</p>
             ))}
             <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest">{config.contactLocation}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
