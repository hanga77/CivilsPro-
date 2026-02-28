import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@/types';
import { galleryService } from '@/services/galleryService';
import Modal from '@/components/ui/Modal';
import WatermarkedImage from '@/components/ui/WatermarkedImage';
import toast from 'react-hot-toast';

const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => { load(); }, []);
  const load = () => galleryService.getAll().then(setItems).catch(() => {});

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await galleryService.create(form); toast.success('Ajouté'); setIsModalOpen(false); load(); }
    catch { toast.error('Erreur'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ?')) return;
    try { await galleryService.delete(id); toast.success('Supprimé'); load(); } catch { toast.error('Erreur'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black text-[#001E42] uppercase">Galerie ({items.length})</h3>
        <button onClick={() => { setForm({}); setIsModalOpen(true); }} className="px-6 py-3 bg-[#001E42] text-white font-black uppercase text-[10px] rounded-lg shadow-lg hover:bg-slate-800"><i className="fas fa-plus mr-2"></i>Ajouter</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="group relative rounded-xl overflow-hidden">
            <WatermarkedImage src={item.url} alt={item.title} className="h-48" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
              <button onClick={() => handleDelete(item.id)} className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                <i className="fas fa-trash text-sm"></i>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="text-white text-[10px] font-black uppercase">{item.title}</p>
              <p className="text-[#FFB81C] text-[8px] font-black uppercase">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajouter à la Galerie">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Titre</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Catégorie</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} required /></div>
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">URL Image</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.url || ''} onChange={e => setForm({ ...form, url: e.target.value })} required /></div>
          <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase">Description</label><textarea rows={3} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })}></textarea></div>
          {form.url && (
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Aperçu avec Watermark</p>
              <WatermarkedImage src={form.url} alt="Preview" className="h-48 rounded-xl" />
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-grow py-4 bg-[#FFB81C] text-[#001E42] font-black uppercase text-xs rounded-xl shadow-lg">Ajouter</button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-4 bg-slate-100 text-slate-500 font-black uppercase text-xs rounded-xl">Annuler</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminGallery;
