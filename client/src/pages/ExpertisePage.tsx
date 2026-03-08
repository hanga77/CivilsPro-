import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Industry } from '@/types';
import { INDUSTRIES } from '@/lib/constants';
import { industryService } from '@/services/industryService';
import ScrollReveal from '@/components/ui/ScrollReveal';
import WatermarkedImage from '@/components/ui/WatermarkedImage';
import CTABanner from '@/components/ui/CTABanner';
import PageBanner from '@/components/ui/PageBanner';

const CERTIFICATIONS = [
  { icon: 'fa-award', title: 'Agrément MINTP', desc: 'Agréé par le Ministère des Travaux Publics du Cameroun pour les travaux de Génie Civil de catégorie A.' },
  { icon: 'fa-shield-halved', title: 'Norme NF EN 1992', desc: 'Conception et dimensionnement selon l\'Eurocode 2 — béton armé et précontraint.' },
  { icon: 'fa-file-contract', title: 'ISO 9001 : 2015', desc: 'Système de management de la qualité certifié — de l\'étude à la réception des ouvrages.' },
  { icon: 'fa-hard-hat', title: 'Garantie Décennale', desc: 'Tous nos ouvrages bénéficient d\'une garantie décennale couvrant les vices de construction.' },
];

const ExpertisePage: React.FC = () => {
  const [industries, setIndustries] = useState<Industry[]>(INDUSTRIES);

  useEffect(() => {
    industryService.getAll().then(setIndustries).catch(() => {});
  }, []);

  return (
    <div className="animate-fadeIn">
      <PageBanner
        label="Capacités de l'Entreprise"
        title="Nos Métiers du"
        titleAccent="Génie Civil."
        description="De la conception structurelle à la livraison clé-en-main — nous maîtrisons l'intégralité de la chaîne de valeur BTP."
        breadcrumb="Industries"
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070"
        stats={[
          { value: '12 ANS', label: "d'expérience terrain" },
          { value: '150+', label: 'Ouvrages livrés' },
          { value: '8', label: 'Secteurs d\'activité' },
          { value: '100%', label: 'Projets dans les délais' },
        ]}
      />

      {/* Méthodologie */}
      <section className="bg-[#001E42] py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-12 text-center">Notre Méthodologie</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Analyse', desc: 'Étude géotechnique et faisabilité', icon: 'fa-magnifying-glass' },
                { step: '02', title: 'Conception', desc: 'Plans d\'exécution et dimensionnement', icon: 'fa-drafting-compass' },
                { step: '03', title: 'Réalisation', desc: 'Suivi chantier et contrôle qualité', icon: 'fa-helmet-safety' },
                { step: '04', title: 'Livraison', desc: 'Réception et garantie décennale', icon: 'fa-circle-check' },
              ].map((item, i) => (
                <div key={item.step} className="relative group">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FFB81C]/10 border border-[#FFB81C]/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FFB81C] group-hover:border-[#FFB81C] transition-all duration-300">
                      <i className={`fas ${item.icon} text-[#FFB81C] group-hover:text-[#001E42] text-xl transition-colors`}></i>
                    </div>
                    <span className="text-5xl font-black text-white/5 italic absolute top-0 right-4">{item.step}</span>
                    <h3 className="text-xl font-black text-white uppercase italic mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm font-bold">{item.desc}</p>
                  </div>
                  {i < 3 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-[2px] bg-[#FFB81C]/30"></div>}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="bg-[#001E42] pb-32">
        <div className="max-w-[1400px] mx-auto px-6">
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
      </section>

      {/* Certifications & Agréments */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Garanties & Qualité</p>
              <h2 className="text-4xl md:text-5xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none">
                Certifications & <span className="text-[#FFB81C]">Agréments.</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CERTIFICATIONS.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-slate-100 rounded-2xl p-8 hover:border-[#FFB81C]/50 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 bg-[#001E42] flex items-center justify-center rounded-xl mb-6 group-hover:bg-[#FFB81C] transition-colors">
                    <i className={`fas ${c.icon} text-[#FFB81C] group-hover:text-[#001E42] text-xl transition-colors`}></i>
                  </div>
                  <h3 className="text-base font-black text-[#001E42] uppercase mb-3">{c.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default ExpertisePage;
