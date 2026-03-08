import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Industry } from '@/types';
import { INDUSTRIES } from '@/lib/constants';
import { industryService } from '@/services/industryService';
import ScrollReveal from '@/components/ui/ScrollReveal';
import WatermarkedImage from '@/components/ui/WatermarkedImage';
import CTABanner from '@/components/ui/CTABanner';

const ExpertisePage: React.FC = () => {
  const [industries, setIndustries] = useState<Industry[]>(INDUSTRIES);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    industryService.getAll().then(setIndustries).catch(() => {});
  }, []);

  return (
    <div className="animate-fadeIn">
      <div className="pt-40 pb-32 bg-[#001E42] min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <header className="mb-24 text-center">
              <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Capacités de l'Entreprise</h4>
              <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">Nos Métiers du <span className="text-[#FFB81C]">Génie Civil.</span></h2>
            </header>
          </ScrollReveal>

          {/* Methodology Timeline */}
          <ScrollReveal>
            <div className="mb-24">
              <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-12 text-center">Notre Méthodologie</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: '01', title: 'Analyse', desc: 'Étude géotechnique et faisabilité' },
                  { step: '02', title: 'Conception', desc: 'Plans d\'exécution et dimensionnement' },
                  { step: '03', title: 'Réalisation', desc: 'Suivi chantier et contrôle qualité' },
                  { step: '04', title: 'Livraison', desc: 'Réception et garantie décennale' },
                ].map((item, i) => (
                  <div key={item.step} className="relative">
                    <div className="text-center">
                      <span className="text-6xl font-black text-white/10 italic">{item.step}</span>
                      <h3 className="text-xl font-black text-white uppercase italic -mt-4 mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm font-bold">{item.desc}</p>
                    </div>
                    {i < 3 && <div className="hidden md:block absolute top-1/3 -right-4 w-8 h-[2px] bg-[#FFB81C]/30"></div>}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.id} delay={i * 0.1}>
                <div className="group relative h-[450px] overflow-hidden bg-slate-900 rounded-3xl border border-white/5 hover:border-[#FFB81C]/50 transition-all duration-500">
                  <div className="absolute inset-0">
                    <WatermarkedImage src={ind.imageUrl} alt={ind.title} className="h-full opacity-30" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001E42] via-[#001E42]/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-12">
                    <span className="text-6xl font-black text-white/10 italic absolute top-6 right-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-16 h-16 bg-[#FFB81C] flex items-center justify-center text-[#001E42] text-3xl mb-8 transform -rotate-6 group-hover:rotate-0 transition-all">
                      <i className={`fas ${ind.icon}`}></i>
                    </div>
                    <h3 className="text-4xl font-black text-white italic uppercase mb-4 tracking-tighter leading-none">{ind.title}</h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      {ind.description}
                    </p>
                    <Link to="/contact" className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest flex items-center gap-4 group-hover:gap-6 transition-all">
                      ÉTUDIER VOTRE BESOIN <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <CTABanner />
    </div>
  );
};

export default ExpertisePage;
