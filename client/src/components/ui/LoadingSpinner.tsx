import React from 'react';

const LoadingSpinner: React.FC<{ text?: string }> = ({ text = 'Chargement...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-[#FFB81C] rounded-full animate-spin mb-6"></div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
