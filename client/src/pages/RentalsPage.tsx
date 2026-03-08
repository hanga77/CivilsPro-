import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RentalItem } from '@/types';
import { rentalService } from '@/services/rentalService';
import ScrollReveal from '@/components/ui/ScrollReveal';
import WatermarkedImage from '@/components/ui/WatermarkedImage';
import CTABanner from '@/components/ui/CTABanner';
import PageBanner from '@/components/ui/PageBanner';

const INITIAL_RENTALS: RentalItem[] = [
  { id: '1', name: "Pelle Hydraulique CAT 320", icon: "fa-tractor", price: "450.000 FCFA/Jour", desc: "Capacité godet 1.2m³, idéale pour terrassements massifs.", isAvailable: true },
  { id: '2', name: "Niveleuse 140K", icon: "fa-shovels", price: "600.000 FCFA/Jour", desc: "Précision de nivellement pour infrastructures routières.", isAvailable: true },
  { id: '3', name: "Camion Malaxeur 8m³", icon: "fa-truck-droplet", price: "180.000 FCFA/Rotation", desc: "Transport et brassage de béton prêt à l'emploi.", isAvailable: false },
  { id: '4', name: "Grue à Tour 50m", icon: "fa-building", price: "Sur Devis", desc: "Levage lourd pour chantiers de bâtiments R+10 et plus.", isAvailable: true },
];

const HOW_TO_RENT = [
  { step: '01', icon: 'fa-phone', title: 'Contact', desc: 'Appelez-nous ou envoyez votre demande via le formulaire en ligne.' },
  { step: '02', icon: 'fa-file-signature', title: 'Devis', desc: 'Nous établissons un devis personnalisé sous 24h selon vos besoins.' },
  { step: '03', icon: 'fa-handshake', title: 'Contrat', desc: 'Signature du contrat de location avec conditions d\'utilisation claires.' },
  { step: '04', icon: 'fa-truck-fast', title: 'Livraison', desc: 'Acheminement et mise en service du matériel sur votre chantier.' },
];

const RentalsPage: React.FC = () => {
  const [rentals, setRentals] = useState<RentalItem[]>(INITIAL_RENTALS);

  useEffect(() => {
    rentalService.getAll().then(setRentals).catch(() => {});
  }, []);

  return (
    <div className="animate-fadeIn">
      <PageBanner
        label="Parc Engins & Matériel BTP"
        title="Matériel de"
        titleAccent="Haute Performance."
        description="Machines récentes, entretenues aux standards constructeurs — disponibilité immédiate pour zéro arrêt chantier."
        breadcrumb="Location Matériel"
        bgImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2070"
        stats={[
          { value: '20+', label: 'Engins disponibles' },
          { value: '24H', label: 'Délai de livraison' },
          { value: '3', label: 'Zones couvertes' },
          { value: '100%', label: 'Maintenus par nos équipes' },
        ]}
      />

      {/* Catalogue Matériel */}
      <section className="bg-[#020617] py-24 text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
              {rentals.map((r, i) => (
                <div key={r.id} className="bg-[#020617] p-12 flex flex-col items-center text-center hover:bg-[#001E42] transition-colors group h-full">
                  <div className="mb-4">
                    <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${
                      r.isAvailable !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {r.isAvailable !== false ? 'Disponible' : 'Indisponible'}
                    </span>
                  </div>

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
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Comment louer */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Simple & Rapide</p>
              <h2 className="text-4xl md:text-5xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none">
                Comment <span className="text-[#FFB81C]">Louer ?</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {HOW_TO_RENT.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="relative text-center group">
                  <div className="w-16 h-16 bg-[#001E42] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FFB81C] transition-colors duration-300">
                    <i className={`fas ${step.icon} text-[#FFB81C] group-hover:text-[#001E42] text-xl transition-colors`}></i>
                  </div>
                  <span className="absolute top-0 right-8 text-5xl font-black text-slate-100 italic">{step.step}</span>
                  <h3 className="text-lg font-black text-[#001E42] uppercase italic mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-[2px] bg-[#FFB81C]/30"></div>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Zone de couverture */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <p className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Déploiement</p>
                <h2 className="text-4xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none mb-8">
                  Zones de <span className="text-[#FFB81C]">Couverture.</span>
                </h2>
                <div className="space-y-4">
                  {[
                    { city: 'Douala', desc: 'Siège opérationnel — Littoral & Sud-Ouest', flag: '📍' },
                    { city: 'Yaoundé', desc: 'Bureau Centre — Région Centre & Est', flag: '📍' },
                    { city: 'Afrique Centrale', desc: 'Déploiement sur demande — Gabon, RCA, Congo', flag: '🌍' },
                  ].map((loc, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100">
                      <span className="text-2xl">{loc.flag}</span>
                      <div>
                        <p className="font-black text-[#001E42] uppercase text-sm">{loc.city}</p>
                        <p className="text-slate-500 text-xs font-bold">{loc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-[#001E42] rounded-3xl p-12 text-white text-center">
                <i className="fas fa-phone-volume text-[#FFB81C] text-5xl mb-8 block"></i>
                <p className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest mb-4">Devis Gratuit sous 24h</p>
                <h3 className="text-2xl font-black italic uppercase mb-8 tracking-tighter">Besoin d'un engin <br />pour votre chantier ?</h3>
                <div className="space-y-3 mb-10">
                  <a href="tel:+237671345441" className="block text-lg font-black text-white hover:text-[#FFB81C] transition-colors">(+237) 671 34 54 41</a>
                  <a href="tel:+237699466321" className="block text-lg font-black text-white hover:text-[#FFB81C] transition-colors">(+237) 699 46 63 21</a>
                </div>
                <Link to="/contact" className="inline-block bg-[#FFB81C] text-[#001E42] font-black uppercase text-[10px] tracking-widest px-10 py-5 hover:bg-white transition-colors">
                  Envoyer une demande
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABanner buttonText="Demander un Devis" highlight="Matériel." title="Besoin de" />
    </div>
  );
};

export default RentalsPage;
