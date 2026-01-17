
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isAdmin, setIsAdmin }) => {
  const LogoIcon = () => (
    <div className="relative w-12 h-12 bg-white rounded-lg flex items-center justify-center border-2 border-[#0033AD] shadow-inner overflow-hidden">
       <div className="absolute top-1 left-1 opacity-20"><i className="fas fa-cog text-[10px] text-[#0033AD]"></i></div>
       <span className="text-2xl font-serif font-bold text-slate-900 mt-[-4px]">π</span>
       <div className="absolute bottom-1 right-1 h-[2px] w-4 bg-[#0033AD]"></div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      <div className="fixed top-6 left-0 right-0 z-[100] px-6">
        <nav className="max-w-7xl mx-auto bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl px-6 py-3 flex justify-between items-center">
          <div 
            className="flex items-center space-x-4 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <LogoIcon />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter text-white group-hover:text-blue-500 transition-colors">
                PI-<span className="text-blue-600 italic">CONSTRUCTION</span>
              </span>
              <span className="text-[8px] font-black tracking-[0.3em] text-slate-500 mt-1 uppercase">BTP SARL • CAMEROUN</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1 bg-white/5 rounded-2xl p-1 border border-white/5">
            {[
              { id: 'home', label: 'ACCUEIL' },
              { id: 'projects', label: 'CHANTIERS' },
              { id: 'gallery', label: 'GALERIE' },
              { id: 'rentals', label: 'LOCATION' },
              { id: 'admin', label: 'GESTION' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-xl text-[10px] font-bold tracking-[0.2em] transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                isAdmin 
                  ? 'bg-transparent border-blue-500 text-blue-500' 
                  : 'bg-white text-slate-900 border-white hover:bg-blue-50'
              }`}
            >
              {isAdmin ? 'ADMIN' : 'PRO'}
            </button>
          </div>
        </nav>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950/80 pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <LogoIcon />
              <h3 className="text-3xl font-black text-white tracking-tighter italic uppercase">Pi-Construction.</h3>
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm font-light">
              Expertise BTP au Cameroun. Équipes mobiles hautement qualifiées pour l'excellence opérationnelle.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-blue-500 tracking-[0.3em] uppercase mb-8">Nous Joindre</h4>
            <div className="space-y-4 text-sm text-slate-400">
              <p className="flex items-center space-x-3">
                <i className="fas fa-phone text-blue-600"></i>
                <span className="text-white font-bold tracking-wider">(+237) 671 34 54 41</span>
              </p>
              <p className="flex items-center space-x-3">
                <i className="fas fa-phone text-blue-600"></i>
                <span className="text-white font-bold tracking-wider">(+237) 699 46 63 21</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-blue-500 tracking-[0.3em] uppercase mb-8">Zone d'Action</h4>
            <p className="text-sm text-slate-500 font-medium">
              Douala (Base)<br/>
              Déploiement National (Cameroun)
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/5 opacity-40 text-[9px] font-bold tracking-[0.3em] uppercase">
          <p>© {new Date().getFullYear()} PI-CONSTRUCTION BTP SARL.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
