import React, { useState, useEffect } from 'react';
import { RentalItem } from '@/types';
import { rentalService } from '@/services/rentalService';
import Modal from '@/components/ui/Modal';
import ImageInput from '@/components/ui/ImageInput';
import toast from 'react-hot-toast';

const AdminRentals: React.FC = () => {
  const [items, setItems] = useState<RentalItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<RentalItem | null>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => { load(); }, []);
  const load = () => rentalService.getAll().then(setItems).catch(() => {});

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await rentalService.update(editing.id, form); toast.success('Mis à jour'); }
      else { await rentalService.create(form); toast.success('Créé'); }
      setIsModalOpen(false); load();
    } catch { toast.error('Erreur'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ?')) return;
    try { await rentalService.delete(id); toast.success('Supprimé'); load(); } catch { toast.error('Erreur'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black text-[#001E42] uppercase">Matériel ({items.length})</h3>
        <button onClick={() => { setEditing(null); setForm({ isAvailable: true }); setIsModalOpen(true); }} className="px-6 py-3 bg-[#001E42] text-white font-black uppercase text-[10px] rounded-lg shadow-lg hover:bg-slate-800"><i className="fas fa-plus mr-2"></i>Ajouter</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group">
            <div className="flex items-center gap-4">
              {item.imageUrl ? (
                <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden"><img src={item.imageUrl} className="w-full h-full object-cover" alt="" /></div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-[#001E42] flex items-center justify-center text-[#FFB81C]"><i className={`fas ${item.icon}`}></i></div>
              )}
              <div>
                <p className="font-black text-xs text-[#001E42] uppercase">{item.name}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase">{item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-full ${item.isAvailable !== false ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {item.isAvailable !== false ? 'Dispo' : 'Indispo'}
              </span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => { setEditing(item); setForm({ ...item }); setIsModalOpen(true); }} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border text-slate-500 hover:text-[#001E42]"><i className="fas fa-pen text-[10px]"></i></button>
                <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-lg border border-red-100 text-red-500 hover:bg-red-500 hover:text-white"><i className="fas fa-trash text-[10px]"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Modifier Matériel' : 'Nouveau Matériel'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Nom</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Icône FA</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} required /></div>
            <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Prix</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.price || ''} onChange={e => setForm({ ...form, price: e.target.value })} required /></div>
          </div>
          <ImageInput label="Photo de l'engin" value={form.imageUrl || ''} onChange={url => setForm({ ...form, imageUrl: url })} />
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Description</label><textarea rows={3} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.desc || ''} onChange={e => setForm({ ...form, desc: e.target.value })}></textarea></div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isAvailable !== false} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} className="w-4 h-4" />
            <span className="text-[9px] font-black text-slate-400 uppercase">Disponible</span>
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

export default AdminRentals;
