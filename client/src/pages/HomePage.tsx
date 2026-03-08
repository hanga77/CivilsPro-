import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteConfig, Project, Industry, TeamMember, Testimonial } from '@/types';
import { INITIAL_PROJECTS, INDUSTRIES, COLORS } from '@/lib/constants';
import { projectService } from '@/services/projectService';
import { industryService } from '@/services/industryService';
import { teamService } from '@/services/teamService';
import { testimonialService } from '@/services/testimonialService';
import { configService } from '@/services/configService';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import TestimonialCard from '@/components/ui/TestimonialCard';
import TeamMemberCard from '@/components/ui/TeamMemberCard';
import CTABanner from '@/components/ui/CTABanner';
import WatermarkedImage from '@/components/ui/WatermarkedImage';

const DEFAULT_CONFIG: SiteConfig = {
  companyName: 'PI-CONSTRUCTION', companySuffix: 'BTP SARL',
  slogan: "L'EXCELLENCE TECHNIQUE AU SERVICE DE L'INFRASTRUCTURE.",
  subSlogan: 'Ingénierie de précision, maîtrise du béton armé et solutions de construction durable pour les défis de demain.',
  logoUrl: '/logo.svg',
  accentColor: '#FFB81C', primaryColor: '#001E42',
  heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070',
  contactPhones: ['(+237) 671 34 54 41', '(+237) 699 46 63 21'],
  contactEmail: 'contact@piconstruction.cm', contactLocation: 'Douala - Yaoundé - Déploiement Afrique Centrale',
  footerAbout: '', stats: { projectsCount: '150+', expertiseYears: '12 ANS', teamSize: '45 EXPERTS' },
  socialLinks: { facebook: '', linkedin: '', instagram: '', whatsapp: '' },
};

const HomePage: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [industries, setIndustries] = useState<Industry[]>(INDUSTRIES);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    configService.get().then(setConfig).catch(() => {});
    projectService.getAll().then(setProjects).catch(() => {});
    industryService.getAll().then(setIndustries).catch(() => {});
    teamService.getAll().then(setTeam).catch(() => {});
    testimonialService.getAll().then(setTestimonials).catch(() => {});
  }, []);

  const recentProjects = projects.slice(0, 3);

  return (
    <div className="animate-fadeIn">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#001E42]">
        <div className="absolute inset-0 z-0">
          <img src={config.heroImage} className="w-full h-full object-cover opacity-60 scale-105 animate-slowZoom" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001E42] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#001E42]/70 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
          <ScrollReveal>
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-[0.9] mb-8 uppercase">
                {config.slogan.split(' ').slice(0, -1).join(' ')} <span className="text-[#FFB81C]">{config.slogan.split(' ').slice(-1)}</span>
              </h1>
              <p className="text-slate-200 text-xl md:text-2xl font-bold max-w-2xl mb-12 border-l-4 border-[#FFB81C] pl-6 leading-relaxed">
                {config.subSlogan}
              </p>
              <div className="flex flex-wrap gap-5">
                <Link to="/contact" className="px-12 py-6 bg-[#FFB81C] text-[#001E42] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1">Consulter un Expert</Link>
                <Link to="/projets" className="px-12 py-6 border-2 border-white text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-[#001E42] transition-all transform hover:-translate-y-1">Nos Projets</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-20 -mt-20 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 shadow-2xl">
          <div className="bg-white p-12 flex flex-col items-center justify-center text-center group hover:bg-[#FFB81C] transition-colors duration-500">
            <AnimatedCounter value={config.stats.projectsCount} label="Projets Réalisés" />
          </div>
          <div className="bg-white p-12 flex flex-col items-center justify-center text-center group hover:bg-[#FFB81C] transition-colors duration-500">
            <AnimatedCounter value={config.stats.expertiseYears} label="Années d'Expérience" />
          </div>
          <div className="bg-white p-12 flex flex-col items-center justify-center text-center group hover:bg-[#FFB81C] transition-colors duration-500">
            <AnimatedCounter value={config.stats.teamSize} label="Ingénieurs & Experts" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <div>
                <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-6">À Propos de nous</h4>
                <h2 className="text-5xl md:text-7xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none mb-10">Bâtir l'indestructible avec <span className="text-[#FFB81C]">rigueur.</span></h2>
                <p className="text-slate-500 text-lg font-bold leading-relaxed mb-10">
                  PI-CONSTRUCTION est née de la volonté de doter l'Afrique centrale d'une ingénierie de classe mondiale. Nous maîtrisons chaque étape du cycle de vie d'une structure : de l'étude géotechnique initiale à la réception définitive.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-l-2 border-[#FFB81C] pl-6">
                    <p className="text-xl font-black text-[#001E42] uppercase italic">Sécurité</p>
                    <p className="text-xs text-slate-400 font-bold uppercase">Tolérance Zéro Incident</p>
                  </div>
                  <div className="border-l-2 border-[#FFB81C] pl-6">
                    <p className="text-xl font-black text-[#001E42] uppercase italic">Précision</p>
                    <p className="text-xs text-slate-400 font-bold uppercase">Normes ISO & Eurocodes</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=1000" className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Work" />
                <div className="absolute -bottom-10 -left-10 bg-[#FFB81C] p-10 hidden md:block rounded-xl shadow-xl">
                  <p className="text-4xl font-black text-[#001E42] italic">100%</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-[#001E42]">Projets Livrés à Temps</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Nos Domaines</h4>
              <h2 className="text-5xl md:text-7xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none">Expertise <span className="text-[#FFB81C]">Sectorielle.</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.slice(0, 4).map((ind, i) => (
              <ScrollReveal key={ind.id} delay={i * 0.1}>
                <Link to="/expertise" className="block group relative h-[350px] overflow-hidden bg-slate-900 rounded-2xl">
                  <div className="absolute inset-0">
                    <WatermarkedImage src={ind.imageUrl} alt={ind.title} className="h-full opacity-40" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001E42] via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <div className="w-12 h-12 bg-[#FFB81C] flex items-center justify-center text-[#001E42] text-xl mb-4">
                      <i className={`fas ${ind.icon}`}></i>
                    </div>
                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight">{ind.title}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
              <div>
                <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Réalisations Récentes</h4>
                <h2 className="text-5xl md:text-7xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none">Nos <span className="text-[#FFB81C]">Projets.</span></h2>
              </div>
              <Link to="/projets" className="text-[10px] font-black text-[#001E42] uppercase tracking-widest flex items-center gap-2 hover:text-[#FFB81C] transition-colors">
                Voir tous les projets <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentProjects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.15}>
                <Link to="/projets" className="block group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all">
                  <div className="h-64 overflow-hidden relative">
                    <WatermarkedImage src={p.thumbnail} alt={p.name} className="h-full" />
                    <div className="absolute top-4 left-4 bg-[#FFB81C] text-[#001E42] px-4 py-1 text-[9px] font-black uppercase tracking-widest z-10">{p.sector}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-black text-[#001E42] uppercase tracking-tight mb-2">{p.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{p.location}</p>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFB81C] rounded-full" style={{ width: `${p.progress}%` }}></div>
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 text-right">{p.progress}%</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-32 bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Témoignages</h4>
                <h2 className="text-5xl md:text-7xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none">Ce que disent nos <span className="text-[#FFB81C]">Clients.</span></h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.filter(t => t.isVisible).slice(0, 3).map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 0.15}>
                  <TestimonialCard testimonial={t} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TEAM */}
      {team.length > 0 && (
        <section className="py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Notre Équipe</h4>
                <h2 className="text-5xl md:text-7xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none">Les Experts <span className="text-[#FFB81C]">Derrière.</span></h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.sort((a, b) => a.order - b.order).map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 0.1}>
                  <TeamMemberCard member={m} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABanner />

      <style>{`
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        .animate-slowZoom { animation: slowZoom 30s infinite alternate ease-in-out; }
      `}</style>
    </div>
  );
};

export default HomePage;
