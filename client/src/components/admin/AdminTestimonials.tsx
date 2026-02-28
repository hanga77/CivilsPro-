import React, { useState, useEffect } from 'react';
import { Testimonial } from '@/types';
import { testimonialService } from '@/services/testimonialService';
import Modal from '@/components/ui/Modal';
import toast from 'react-hot-toast';

const AdminTestimonials: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => { load(); }, []);
  const load = () => testimonialService.getAll().then(setItems).catch(() => {});

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await testimonialService.update(editing.id, form); toast.success('Mis à jour'); }
      else { await testimonialService.create(form); toast.success('Créé'); }
      setIsModalOpen(false); load();
    } catch { toast.error('Erreur'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ?')) return;
    try { await testimonialService.delete(id); toast.success('Supprimé'); load(); } catch { toast.error('Erreur'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black text-[#001E42] uppercase">Témoignages ({items.length})</h3>
        <button onClick={() => { setEditing(null); setForm({ rating: 5, isVisible: true }); setIsModalOpen(true); }} className="px-6 py-3 bg-[#001E42] text-white font-black uppercase text-[10px] rounded-lg shadow-lg hover:bg-slate-800"><i className="fas fa-plus mr-2"></i>Ajouter</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {items.map(t => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group">
            <div className="flex items-center gap-4">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <i key={s} className={`fas fa-star text-[10px] ${s <= t.rating ? 'text-[#FFB81C]' : 'text-slate-200'}`}></i>)}</div>
              <div>
                <p className="font-black text-xs text-[#001E42] uppercase">{t.clientName}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase">{t.company} — {t.isVisible ? 'Visible' : 'Masqué'}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => { setEditing(t); setForm({ ...t }); setIsModalOpen(true); }} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border text-slate-500 hover:text-[#001E42]"><i className="fas fa-pen text-[10px]"></i></button>
              <button onClick={() => handleDelete(t.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-lg border border-red-100 text-red-500 hover:bg-red-500 hover:text-white"><i className="fas fa-trash text-[10px]"></i></button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Modifier Témoignage' : 'Nouveau Témoignage'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Nom Client</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.clientName || ''} onChange={e => setForm({ ...form, clientName: e.target.value })} required /></div>
            <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Fonction</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.clientRole || ''} onChange={e => setForm({ ...form, clientRole: e.target.value })} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Entreprise</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.company || ''} onChange={e => setForm({ ...form, company: e.target.value })} required /></div>
            <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Note (1-5)</label><input type="number" min="1" max="5" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.rating || 5} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} /></div>
          </div>
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Contenu</label><textarea rows={4} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.content || ''} onChange={e => setForm({ ...form, content: e.target.value })} required></textarea></div>
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">URL Avatar</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.avatarUrl || ''} onChange={e => setForm({ ...form, avatarUrl: e.target.value })} /></div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isVisible !== false} onChange={e => setForm({ ...form, isVisible: e.target.checked })} className="w-4 h-4" />
            <span className="text-[9px] font-black text-slate-400 uppercase">Visible sur le site</span>
          </label>
          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-grow py-4 bg-[#FFB81C] text-[#001E42] font-black uppercase text-xs rounded-xl shadow-lg">Enregistrer</button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-4 bg-slate-100 text-slate-500 font-black uppercase text-xs rounded-xl">Annuler</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTestimonials;
