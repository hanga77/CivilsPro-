import React from 'react';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  logoUrl?: string;
  companyName?: string;
  className?: string;
  onClick?: () => void;
}

const WatermarkedImage: React.FC<WatermarkedImageProps> = ({
  src,
  alt,
  logoUrl = '/logo.svg',
  companyName = 'PI-CONSTRUCTION',
  className = '',
  onClick,
}) => {
  return (
    <div className={`relative overflow-hidden group ${className}`} onClick={onClick}>
      <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {/* Watermark overlay */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Diagonal text watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/10 text-4xl md:text-6xl font-black uppercase italic tracking-widest -rotate-[30deg] whitespace-nowrap">
            {companyName}
          </span>
        </div>
        {/* Logo watermark bottom-right */}
        <div className="absolute bottom-4 right-4 w-12 h-12 opacity-40">
          <img src={logoUrl} alt="" className="w-full h-full object-contain brightness-0 invert" />
        </div>
      </div>
    </div>
  );
};

export default WatermarkedImage;
