import React, { useState, useEffect } from 'react';
import { SiteConfig } from '@/types';
import { messageService } from '@/services/messageService';
import { configService } from '@/services/configService';
import toast from 'react-hot-toast';
import ScrollReveal from '@/components/ui/ScrollReveal';

const ContactPage: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Demande de Devis', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    configService.get().then(setConfig).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await messageService.send(form);
      toast.success('Votre demande a été enregistrée. Un ingénieur vous recontactera sous 24h.');
      setForm({ name: '', email: '', subject: 'Demande de Devis', message: '' });
    } catch {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSending(false);
    }
  };

  const phones = config?.contactPhones || ['(+237) 671 34 54 41', '(+237) 699 46 63 21'];
  const email = config?.contactEmail || 'contact@piconstruction.cm';
  const location = config?.contactLocation || 'Douala - Yaoundé';
  const whatsapp = config?.socialLinks?.whatsapp || '237671345441';

  return (
    <div className="pt-40 pb-32 bg-white animate-fadeIn">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-20">
          <ScrollReveal>
            <div className="lg:col-span-1">
              <h2 className="text-6xl font-black italic text-[#001E42] uppercase tracking-tighter leading-none mb-10">Parlons <span className="text-[#FFB81C]">Technique.</span></h2>
              <p className="text-slate-500 font-bold mb-10">Nos bureaux d'études sont ouverts du Lundi au Vendredi de 8h à 17h.</p>
              <div className="space-y-8">
                {phones.map((p, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-[#001E42] rounded-xl"><i className="fas fa-phone"></i></div>
                    <span className="text-xl font-black text-[#001E42]">{p}</span>
                  </div>
                ))}
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-[#001E42] rounded-xl"><i className="fas fa-envelope"></i></div>
                  <span className="text-lg font-black text-[#001E42] uppercase">{email}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-[#001E42] rounded-xl"><i className="fas fa-location-dot"></i></div>
                  <span className="text-sm font-black text-[#001E42] uppercase">{location}</span>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-green-600 transition-all shadow-lg"
              >
                <i className="fab fa-whatsapp text-xl"></i> Écrire sur WhatsApp
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-10 lg:p-16 border border-slate-100 rounded-[2rem] shadow-sm">
                <input required placeholder="NOM DE VOTRE ENTITÉ" className="bg-white p-6 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C] rounded-xl" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input required type="email" placeholder="EMAIL DE CONTACT" className="bg-white p-6 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C] rounded-xl" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <select className="md:col-span-2 bg-white p-6 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C] rounded-xl" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                  <option>Demande de Devis</option>
                  <option>Expertise Structurelle</option>
                  <option>Construction Bâtiment</option>
                  <option>Infrastructures Routières</option>
                  <option>Location Engins Lourds</option>
                  <option>Audit de Chantier</option>
                </select>
                <textarea required rows={6} className="md:col-span-2 bg-white p-6 text-xs font-black uppercase border border-slate-200 outline-none focus:border-[#FFB81C] rounded-xl" placeholder="DESCRIPTIF SOMMAIRE DE VOS BESOINS..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}></textarea>
                <button type="submit" disabled={sending} className="md:col-span-2 py-8 bg-[#001E42] text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FFB81C] hover:text-[#001E42] transition-all shadow-xl rounded-xl disabled:opacity-50">
                  {sending ? 'Envoi en cours...' : 'Lancer la consultation'}
                </button>
              </form>

              {/* Google Maps */}
              <div className="mt-12 rounded-2xl overflow-hidden shadow-lg h-72">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127361.34485789867!2d9.6731!3d4.0511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128be2e1fe6d%3A0x8bf3f06d1c403f1a!2sDouala%2C%20Cameroon!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PI-CONSTRUCTION Location"
                ></iframe>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
