
import React from 'react';
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
  const LogoIcon = () => (
    <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center border-b-4 shadow-xl overflow-hidden transition-all group-hover:scale-110" style={{ borderBottomColor: config.accentColor }}>
       {config.logoUrl ? (
         <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
       ) : (
         <div className="flex flex-col items-center">
          <span className="text-2xl font-black text-slate-900 leading-none">π</span>
          <div className="h-1 w-4 rounded-full mt-0.5" style={{ backgroundColor: config.accentColor }}></div>
         </div>
       )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(${config.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${config.accentColor} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <header className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6">
        <nav className="max-w-7xl mx-auto bg-slate-950/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl px-6 py-3 flex justify-between items-center overflow-hidden">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <LogoIcon />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white leading-none">
                {config.companyName}<span style={{ color: config.accentColor }}>+</span>
              </span>
              <span className="text-[7px] font-black tracking-[0.4em] text-slate-500 uppercase mt-1">Ingéniosité & Mobilité</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'home', label: 'ACCUEIL', icon: 'fa-house' },
              { id: 'projects', label: 'RÉALISATIONS', icon: 'fa-helmet-safety' },
              { id: 'rentals', label: 'LOCATIONS', icon: 'fa-truck-pickup' },
              { id: 'admin', label: 'SYSTÈME', icon: 'fa-lock' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center space-x-2 px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'text-white shadow-inner' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                style={activeTab === tab.id ? { backgroundColor: `${config.accentColor}22`, border: `1px solid ${config.accentColor}44` } : {}}
              >
                <i className={`fas ${tab.icon} text-[10px] opacity-50 group-hover:opacity-100`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a href={`https://wa.me/${config.socialLinks.whatsapp.replace(/\D/g,'')}`} className="hidden md:flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all">
               <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.accentColor }}></div>
               <span className="text-[10px] font-black text-white">PI-DIRECT</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-grow relative z-10">
        {children}
      </main>

      <footer className="relative z-10 bg-slate-950 pt-32 pb-12 border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-10 rounded-full" style={{ backgroundColor: config.accentColor }}></div>
        
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-black text-white italic tracking-tighter mb-6 uppercase leading-tight">
              Ingéniosité <br/><span style={{ color: config.accentColor }}>& Perspicacité.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium italic border-l-2 pl-4" style={{ borderColor: config.accentColor }}>
              {config.footerAbout}
            </p>
            <div className="flex space-x-4 mt-8">
               {Object.entries(config.socialLinks).map(([key, url]) => (
                 url && (
                   <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 border border-white/5 transition-all shadow-lg">
                      <i className={`fab fa-${key === 'whatsapp' ? 'whatsapp' : key} text-lg`}></i>
                   </a>
                 )
               ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[9px] font-black tracking-[0.4em] uppercase mb-8 opacity-40">Unités Mobiles</h4>
            <div className="space-y-6">
              {config.contactPhones.map((phone, idx) => (
                <div key={idx} className="group">
                  <p className="text-[9px] text-slate-500 font-black mb-1">DÉPLOIEMENT {idx + 1}</p>
                  <p className="text-white font-bold tracking-tighter text-lg">{phone}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[9px] font-black tracking-[0.4em] uppercase mb-8 opacity-40">Logistique</h4>
            <p className="text-slate-300 font-bold leading-relaxed whitespace-pre-line italic">
              "Équipements modernes, <br/>Personnel qualifié & professionnel."
            </p>
            <a href={`https://wa.me/${config.socialLinks.whatsapp.replace(/\D/g,'')}`} className="mt-8 inline-flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
              <span style={{ color: config.accentColor }}>PARLER À UN EXPERT</span>
              <i className="fab fa-whatsapp" style={{ color: config.accentColor }}></i>
            </a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-black tracking-[0.3em] uppercase opacity-40">
          <p>© {new Date().getFullYear()} {config.companyName} {config.companySuffix}. INGÉNIOSITÉ & RÉACTIVITÉ.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Satisfaction Client</a>
            <a href="#" className="hover:text-white transition-colors">Personnel Pro</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
