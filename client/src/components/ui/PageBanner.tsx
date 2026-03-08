import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

interface PageBannerProps {
  label: string;
  title: string;
  titleAccent: string;
  description?: string;
  breadcrumb: string;
  bgImage?: string;
  stats?: { value: string; label: string }[];
}

const PageBanner: React.FC<PageBannerProps> = ({ label, title, titleAccent, description, breadcrumb, bgImage, stats }) => (
  <section className="relative pt-28 pb-20 bg-[#001E42] overflow-hidden">
    {bgImage && (
      <img src={bgImage} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="" aria-hidden="true" />
    )}
    <div className="absolute inset-0 bg-gradient-to-r from-[#001E42] via-[#001E42]/95 to-[#001E42]/60 pointer-events-none"></div>

    {/* Decorative letter */}
    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[200px] md:text-[280px] font-black text-white/[0.04] italic leading-none select-none hidden lg:block">
      {titleAccent.charAt(0)}
    </span>
    {/* Gold accent bar */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFB81C]"></div>

    <div className="relative z-10 max-w-[1400px] mx-auto px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-3 mb-10 text-[10px] font-black uppercase tracking-widest">
        <Link to="/" className="text-slate-400 hover:text-[#FFB81C] transition-colors">Accueil</Link>
        <i className="fas fa-chevron-right text-[#FFB81C] text-[8px]"></i>
        <span className="text-white">{breadcrumb}</span>
      </nav>

      <ScrollReveal>
        <p className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">{label}</p>
        <h1 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none mb-6">
          {title} <span className="text-[#FFB81C]">{titleAccent}</span>
        </h1>
        {description && (
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest max-w-2xl leading-relaxed">{description}</p>
        )}
      </ScrollReveal>

      {stats && stats.length > 0 && (
        <div className="flex flex-wrap gap-12 mt-12 pt-12 border-t border-white/10">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-black text-[#FFB81C] italic">{s.value}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default PageBanner;
