
import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'ACCUEIL', icon: 'fa-house' },
    { id: 'expertise', label: 'INDUSTRIES', icon: 'fa-microchip' },
    { id: 'projects', label: 'RÉALISATIONS', icon: 'fa-helmet-safety' },
    { id: 'rentals', label: 'MATÉRIEL', icon: 'fa-truck-pickup' },
    { id: 'contact', label: 'CONTACT', icon: 'fa-paper-plane' },
    { id: 'admin', label: 'PORTAIL', icon: 'fa-lock' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'bg-[#001E42] py-2 shadow-2xl' : 'bg-transparent py-6'
      }`}>
        <nav className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-12 h-12 bg-white flex items-center justify-center p-1 rounded-sm shadow-xl">
               <img src={config.logoUrl} className="w-full h-full object-contain" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tighter leading-none uppercase ${scrolled ? 'text-white' : 'text-white'}`}>
                {config.companyName}
              </span>
              <span className="text-[7px] font-black tracking-[0.4em] text-[#FFB81C] uppercase mt-1">
                {config.companySuffix}
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2 text-[10px] font-black tracking-widest transition-all ${
                  activeTab === tab.id ? 'text-[#FFB81C]' : 'text-white hover:text-[#FFB81C]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#FFB81C]"></span>
                )}
              </button>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white">
            <i className={`fas ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 top-0 bg-[#001E42] transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-end p-6">
            <button onClick={() => setIsMenuOpen(false)} className="text-white text-2xl"><i className="fas fa-xmark"></i></button>
          </div>
          <div className="flex flex-col p-10 space-y-8">
            {navItems.map((tab) => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }} className="text-left text-3xl font-black text-white uppercase italic tracking-tighter border-b border-white/10 pb-4">
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#001E42] text-white pt-24 pb-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-black italic tracking-tighter mb-8 uppercase">
                {config.companyName} <span className="text-[#FFB81C]">{config.companySuffix}</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                {config.footerAbout}
              </p>
              <div className="flex gap-6 mt-10">
                {Object.entries(config.socialLinks).map(([key, url]) => url && (
                  <a key={key} href={url} target="_blank" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#FFB81C] hover:text-[#001E42] transition-all">
                    <i className={`fab fa-${key}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB81C] mb-8">Navigation</h4>
              <div className="flex flex-col space-y-4">
                 {navItems.slice(0, 4).map(item => (
                   <button key={item.id} onClick={() => setActiveTab(item.id)} className="text-left text-slate-400 hover:text-white font-bold uppercase text-xs tracking-widest">{item.label}</button>
                 ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB81C] mb-8">Contact</h4>
              <div className="space-y-4 text-slate-400 font-bold text-sm">
                 {config.contactPhones.map((p, i) => <p key={i}>{p}</p>)}
                 <p className="text-white">{config.contactEmail}</p>
                 <p className="text-xs uppercase tracking-widest leading-loose">{config.contactLocation}</p>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© {new Date().getFullYear()} {config.companyName} - Tous droits réservés.</p>
             <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <a href="#">Confidentialité</a>
                <a href="#">Mentions Légales</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
