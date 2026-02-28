import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

interface CTABannerProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CTABanner: React.FC<CTABannerProps> = ({
  title = 'Parlons de votre',
  highlight = 'Projet.',
  subtitle = 'Nos ingénieurs sont prêts à transformer votre vision en réalité.',
  buttonText = 'Nous Contacter',
  buttonLink = '/contact',
}) => {
  return (
    <section className="py-32 bg-[#001E42] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFB81C] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFB81C] rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none mb-8">
            {title} <span className="text-[#FFB81C]">{highlight}</span>
          </h2>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-12 font-bold">{subtitle}</p>
          <Link to={buttonLink} className="inline-block px-16 py-6 bg-[#FFB81C] text-[#001E42] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1">
            {buttonText}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTABanner;
