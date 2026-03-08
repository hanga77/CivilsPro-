import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteConfig } from '@/types';
import { configService } from '@/services/configService';
import useSEO from '@/hooks/useSEO';

const DEFAULT_CONFIG: SiteConfig = {
  companyName: 'PI-CONSTRUCTION', companySuffix: 'BTP SARL',
  slogan: '', subSlogan: '',
  logoUrl: '/logo.svg',
  accentColor: '#FFB81C', primaryColor: '#001E42', heroImage: '',
  contactPhones: ['(+237) 671 34 54 41', '(+237) 699 46 63 21'],
  contactEmail: 'contact@piconstruction.cm',
  contactLocation: 'Douala - Yaoundé - Déploiement Afrique Centrale',
  footerAbout: 'PI-CONSTRUCTION BTP SARL est un acteur majeur du Génie Civil, spécialisé dans les infrastructures lourdes, le bâtiment industriel et l\'expertise en structures complexes.',
  stats: { projectsCount: '150+', expertiseYears: '12 ANS', teamSize: '45 EXPERTS' },
  socialLinks: { facebook: 'https://facebook.com/piconstruction', linkedin: 'https://linkedin.com/company/piconstruction', instagram: '', whatsapp: '237671345441' },
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const location = useLocation();

  useEffect(() => {
    configService.get().then(setConfig).catch(() => {});
  }, []);

  // SEO dynamique — se met à jour quand la config change
  const seoConfig = config as any;
  const pageNames: Record<string, string> = {
    '/': 'Accueil',
    '/expertise': 'Nos Industries',
    '/projets': 'Réalisations',
    '/materiel': 'Location Matériel',
    '/galerie': 'Galerie',
    '/contact': 'Contact',
  };
  const pageSuffix = pageNames[location.pathname] ? ` | ${pageNames[location.pathname]}` : '';
  useSEO({
    title: (seoConfig.seoTitle || `${config.companyName} | ${config.companySuffix}`) + pageSuffix,
    description: seoConfig.seoDescription || config.subSlogan || `${config.companyName} ${config.companySuffix} — Expertise en Génie Civil et BTP au Cameroun.`,
    keywords: seoConfig.seoKeywords || 'Génie Civil, BTP Cameroun, Construction Douala, PI-CONSTRUCTION',
    image: config.heroImage,
    url: seoConfig.canonicalUrl || undefined,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'ACCUEIL', icon: 'fa-house' },
    { path: '/expertise', label: 'INDUSTRIES', icon: 'fa-microchip' },
    { path: '/projets', label: 'RÉALISATIONS', icon: 'fa-helmet-safety' },
    { path: '/materiel', label: 'MATÉRIEL', icon: 'fa-truck-pickup' },
    { path: '/galerie', label: 'GALERIE', icon: 'fa-images' },
    { path: '/contact', label: 'CONTACT', icon: 'fa-paper-plane' },
    { path: '/admin', label: 'PORTAIL', icon: 'fa-lock' },
  ];

  const isFocusMode = location.pathname === '/contact';
  const isAdmin = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled || isFocusMode || isAdmin || !isHomePage ? 'bg-[#001E42] py-2 shadow-2xl' : 'bg-[#001E42]/50 backdrop-blur-md py-6'
      }`}>
        <nav className="max-w-[1400px] mx-auto px-6 flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-[#001E42] border-2 border-[#FFB81C] flex items-center justify-center rounded-sm shadow-xl transition-transform group-hover:scale-105 overflow-hidden">
              <img
                src={config.logoUrl}
                className="w-full h-full object-contain"
                alt="Logo PI-CONSTRUCTION"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = 'none';
                  const parent = el.parentElement;
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fb = document.createElement('span');
                    fb.className = 'logo-fallback text-[#FFB81C] font-black text-xl italic';
                    fb.textContent = 'PI';
                    parent.appendChild(fb);
                  }
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none uppercase text-white">{config.companyName}</span>
              <span className="text-[7px] font-black tracking-[0.4em] text-[#FFB81C] uppercase mt-1">{config.companySuffix}</span>
            </div>
          </Link>

          {!isFocusMode && (
            <>
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-5 py-2 text-[10px] font-black tracking-widest transition-all ${
                      location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                        ? 'text-[#FFB81C]'
                        : 'text-white hover:text-[#FFB81C]'
                    }`}
                  >
                    {item.label}
                    {(location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))) && (
                      <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#FFB81C]"></span>
                    )}
                  </Link>
                ))}
              </div>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white">
                <i className={`fas ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
              </button>
            </>
          )}

          {isFocusMode && (
            <Link to="/" className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
              <i className="fas fa-arrow-left"></i> Retour au site
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        {!isFocusMode && (
          <div className={`lg:hidden fixed inset-0 top-0 bg-[#001E42] transition-all duration-500 z-[99] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end p-6">
              <button onClick={() => setIsMenuOpen(false)} className="text-white text-2xl"><i className="fas fa-xmark"></i></button>
            </div>
            <div className="flex flex-col p-10 space-y-8">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className="text-left text-3xl font-black text-white uppercase italic tracking-tighter border-b border-white/10 pb-4">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      {/* FOOTER */}
      {!isAdmin && (
        <footer className="bg-[#001E42] text-white pt-24 pb-12 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
              <div className="lg:col-span-2">
                <h2 className="text-4xl font-black italic tracking-tighter mb-8 uppercase">
                  {config.companyName} <span className="text-[#FFB81C]">{config.companySuffix}</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">{config.footerAbout}</p>
                <div className="flex gap-6 mt-10">
                  {Object.entries(config.socialLinks).map(([key, url]) => url && (
                    <a key={key} href={key === 'whatsapp' ? `https://wa.me/${url}` : url} target="_blank" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#FFB81C] hover:text-[#001E42] transition-all">
                      <i className={`fab fa-${key}`}></i>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB81C] mb-8">Navigation</h4>
                <div className="flex flex-col space-y-4">
                  {navItems.slice(0, 5).map(item => (
                    <Link key={item.path} to={item.path} className="text-left text-slate-400 hover:text-white font-bold uppercase text-xs tracking-widest">{item.label}</Link>
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
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">&copy; {new Date().getFullYear()} {config.companyName} - Tous droits réservés.</p>
              <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <a href="#">Confidentialité</a>
                <a href="#">Mentions Légales</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
