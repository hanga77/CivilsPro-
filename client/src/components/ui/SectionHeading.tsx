import React from 'react';

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  highlight?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ subtitle, title, highlight, centered = false, light = false }) => {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">{subtitle}</h4>
      <h2 className={`text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none ${light ? 'text-white' : 'text-[#001E42]'}`}>
        {title} {highlight && <span className="text-[#FFB81C]">{highlight}</span>}
      </h2>
    </div>
  );
};

export default SectionHeading;
