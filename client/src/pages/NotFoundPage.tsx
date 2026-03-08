import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#001E42] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <p className="text-[#FFB81C] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Erreur 404</p>
        <h1 className="text-8xl md:text-9xl font-black text-white italic tracking-tighter leading-none mb-6">404</h1>
        <p className="text-slate-400 text-lg font-bold mb-12">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-block px-12 py-5 bg-[#FFB81C] text-[#001E42] font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-1"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
