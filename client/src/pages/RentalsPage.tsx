import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RentalItem } from '@/types';
import { rentalService } from '@/services/rentalService';
import ScrollReveal from '@/components/ui/ScrollReveal';
import WatermarkedImage from '@/components/ui/WatermarkedImage';
import CTABanner from '@/components/ui/CTABanner';

const INITIAL_RENTALS: RentalItem[] = [
  { id: '1', name: "Pelle Hydraulique CAT 320", icon: "fa-tractor", price: "450.000 FCFA/Jour", desc: "Capacité godet 1.2m³, idéale pour terrassements massifs.", isAvailable: true },
  { id: '2', name: "Niveleuse 140K", icon: "fa-shovels", price: "600.000 FCFA/Jour", desc: "Précision de nivellement pour infrastructures routières.", isAvailable: true },
  { id: '3', name: "Camion Malaxeur 8m³", icon: "fa-truck-droplet", price: "180.000 FCFA/Rotation", desc: "Transport et brassage de béton prêt à l'emploi.", isAvailable: false },
  { id: '4', name: "Grue à Tour 50m", icon: "fa-building", price: "Sur Devis", desc: "Levage lourd pour chantiers de bâtiments R+10 et plus.", isAvailable: true },
];

const RentalsPage: React.FC = () => {
  const [rentals, setRentals] = useState<RentalItem[]>(INITIAL_RENTALS);

  useEffect(() => {
    rentalService.getAll().then(setRentals).catch(() => {});
  }, []);

  return (
    <div className="animate-fadeIn">
      <div className="pt-40 pb-32 bg-[#020617] min-h-screen text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-24">
              <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Parc Engins</h4>
              <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none mb-8">Matériel de <span className="text-[#FFB81C]">Haute Performance.</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-bold">Disponibilité immédiate de machines récentes, entretenues selon les standards constructeurs pour garantir zéro arrêt chantier.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            {rentals.map((r, i) => (
              <ScrollReveal key={r.id} delay={i * 0.1}>
                <div className="bg-[#020617] p-12 flex flex-col items-center text-center hover:bg-[#001E42] transition-colors group h-full">
                  {/* Availability Badge */}
                  <div className="mb-4">
                    <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${
                      r.isAvailable !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {r.isAvailable !== false ? 'Disponible' : 'Indisponible'}
                    </span>
                  </div>

                  {/* Image or Icon */}
                  {r.imageUrl ? (
                    <div className="w-32 h-32 rounded-2xl overflow-hidden mb-8">
                      <WatermarkedImage src={r.imageUrl} alt={r.name} className="h-full" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-10 group-hover:bg-[#FFB81C] transition-all duration-500">
                      <i className={`fas ${r.icon} text-4xl text-[#FFB81C] group-hover:text-[#001E42]`}></i>
                    </div>
                  )}

                  <h3 className="text-xl font-black italic uppercase mb-4 tracking-tighter h-12 flex items-center">{r.name}</h3>
                  <p className="text-slate-400 mb-10 text-[10px] font-bold uppercase tracking-widest italic h-16">{r.desc}</p>
                  <p className="text-2xl font-black text-white mb-10 tracking-tighter">{r.price}</p>
                  <Link
                    to="/contact"
                    className={`w-full py-5 font-black uppercase text-[10px] tracking-widest transition-all transform group-hover:-translate-y-2 text-center block ${
                      r.isAvailable !== false
                        ? 'bg-[#FFB81C] text-[#001E42] hover:bg-white'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {r.isAvailable !== false ? 'Demander un devis' : 'Indisponible'}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <CTABanner buttonText="Demander un Devis" highlight="Matériel." title="Besoin de" />
    </div>
  );
};

export default RentalsPage;
