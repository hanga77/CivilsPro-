import React, { useState, useEffect } from 'react';
import { TeamMember } from '@/types';
import { teamService } from '@/services/teamService';
import Modal from '@/components/ui/Modal';
import toast from 'react-hot-toast';

const AdminTeam: React.FC = () => {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => { load(); }, []);
  const load = () => teamService.getAll().then(setItems).catch(() => {});

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await teamService.update(editing.id, form); toast.success('Mis à jour'); }
      else { await teamService.create(form); toast.success('Créé'); }
      setIsModalOpen(false); load();
    } catch { toast.error('Erreur'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ?')) return;
    try { await teamService.delete(id); toast.success('Supprimé'); load(); } catch { toast.error('Erreur'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black text-[#001E42] uppercase">Équipe ({items.length})</h3>
        <button onClick={() => { setEditing(null); setForm({ order: items.length }); setIsModalOpen(true); }} className="px-6 py-3 bg-[#001E42] text-white font-black uppercase text-[10px] rounded-lg shadow-lg hover:bg-slate-800"><i className="fas fa-plus mr-2"></i>Ajouter</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {items.sort((a, b) => a.order - b.order).map(m => (
          <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#001E42] flex items-center justify-center text-white font-black">
                {m.photoUrl ? <img src={m.photoUrl} className="w-full h-full object-cover" alt="" /> : m.name.charAt(0)}
              </div>
              <div>
                <p className="font-black text-xs text-[#001E42] uppercase">{m.name}</p>
                <p className="text-[9px] text-[#FFB81C] font-bold uppercase">{m.role}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => { setEditing(m); setForm({ ...m }); setIsModalOpen(true); }} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border text-slate-500 hover:text-[#001E42]"><i className="fas fa-pen text-[10px]"></i></button>
              <button onClick={() => handleDelete(m.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-lg border border-red-100 text-red-500 hover:bg-red-500 hover:text-white"><i className="fas fa-trash text-[10px]"></i></button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Modifier Membre' : 'Nouveau Membre'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Nom</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Rôle</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.role || ''} onChange={e => setForm({ ...form, role: e.target.value })} required /></div>
          </div>
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">URL Photo</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.photoUrl || ''} onChange={e => setForm({ ...form, photoUrl: e.target.value })} /></div>
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Bio</label><textarea rows={3} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })}></textarea></div>
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Ordre d'affichage</label><input type="number" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.order ?? 0} onChange={e => setForm({ ...form, order: Number(e.target.value) })} /></div>
          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-grow py-4 bg-[#FFB81C] text-[#001E42] font-black uppercase text-xs rounded-xl shadow-lg">Enregistrer</button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-4 bg-slate-100 text-slate-500 font-black uppercase text-xs rounded-xl">Annuler</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTeam;
