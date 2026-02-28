import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus } from '@/types';
import { projectService } from '@/services/projectService';
import Modal from '@/components/ui/Modal';
import toast from 'react-hot-toast';

interface BeforeAfterPair {
  before: string;
  after: string;
  label?: string;
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<any>({});
  const [beforeAfterPairs, setBeforeAfterPairs] = useState<BeforeAfterPair[]>([]);

  useEffect(() => { load(); }, []);
  const load = () => projectService.getAll().then(setProjects).catch(() => toast.error('Erreur chargement'));

  const handleEdit = (p: Project) => {
    setEditing(p);
    setForm({ ...p });
    setBeforeAfterPairs(p.beforeAfterImages || []);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({ status: ProjectStatus.PLANNING, progress: 0 });
    setBeforeAfterPairs([]);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, beforeAfterImages: beforeAfterPairs.filter(p => p.before && p.after) };
    try {
      if (editing) {
        await projectService.update(editing.id, payload);
        toast.success('Projet mis à jour');
      } else {
        await projectService.create(payload);
        toast.success('Projet créé');
      }
      setIsModalOpen(false);
      load();
    } catch { toast.error('Erreur'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return;
    try { await projectService.delete(id); toast.success('Supprimé'); load(); } catch { toast.error('Erreur'); }
  };

  const addPair = () => setBeforeAfterPairs([...beforeAfterPairs, { before: '', after: '', label: '' }]);
  const removePair = (idx: number) => setBeforeAfterPairs(beforeAfterPairs.filter((_, i) => i !== idx));
  const updatePair = (idx: number, field: keyof BeforeAfterPair, value: string) => {
    setBeforeAfterPairs(beforeAfterPairs.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black text-[#001E42] uppercase">Projets ({projects.length})</h3>
        <button onClick={handleAdd} className="px-6 py-3 bg-[#001E42] text-white font-black uppercase text-[10px] rounded-lg shadow-lg hover:bg-slate-800 transition-all">
          <i className="fas fa-plus mr-2"></i>Ajouter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map(p => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden">
                <img src={p.thumbnail || 'https://via.placeholder.com/100'} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <p className="font-black text-xs text-[#001E42] uppercase">{p.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">{p.location} — {p.status} ({p.progress}%)</p>
                  {p.beforeAfterImages && p.beforeAfterImages.length > 0 && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-500 text-[7px] font-black uppercase rounded-full">
                      {p.beforeAfterImages.length} avant/après
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => handleEdit(p)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 hover:text-[#001E42]"><i className="fas fa-pen text-[10px]"></i></button>
              <button onClick={() => handleDelete(p.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-lg shadow-sm border border-red-100 text-red-500 hover:bg-red-500 hover:text-white"><i className="fas fa-trash text-[10px]"></i></button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Modifier Projet' : 'Nouveau Projet'} maxWidth="max-w-3xl">
        <form onSubmit={handleSave} className="space-y-5">
          {/* Infos de base */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase">Nom</label>
              <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase">Lieu</label>
              <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.location || ''} onChange={e => setForm({ ...form, location: e.target.value })} required />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase">Client</label>
              <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.client || ''} onChange={e => setForm({ ...form, client: e.target.value })} required />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase">Secteur</label>
              <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.sector || ''} onChange={e => setForm({ ...form, sector: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase">Budget (FCFA)</label>
              <input type="number" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.budget || ''} onChange={e => setForm({ ...form, budget: Number(e.target.value) })} required />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase">Progression (%)</label>
              <input type="number" min="0" max="100" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.progress ?? 0} onChange={e => setForm({ ...form, progress: Number(e.target.value) })} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase">Statut</label>
              <select className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.status || ''} onChange={e => setForm({ ...form, status: e.target.value })}>
                {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase">Date Début</label>
              <input type="date" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.startDate || ''} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase">URL Miniature</label>
            <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.thumbnail || ''} onChange={e => setForm({ ...form, thumbnail: e.target.value })} />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase">Description</label>
            <textarea rows={3} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
          </div>

          {/* AVANT / APRÈS — section dynamique */}
          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-black text-[#001E42] uppercase flex items-center gap-2">
                  <i className="fas fa-images text-[#FFB81C]"></i>
                  Photos Avant / Après
                </h4>
                <p className="text-[9px] text-slate-400 font-bold">Ajoutez plusieurs paires de photos pour montrer l'évolution du chantier</p>
              </div>
              <button
                type="button"
                onClick={addPair}
                className="px-4 py-2 bg-[#FFB81C] text-[#001E42] font-black uppercase text-[9px] rounded-lg hover:bg-yellow-400 transition-all flex items-center gap-1"
              >
                <i className="fas fa-plus text-[8px]"></i> Ajouter une paire
              </button>
            </div>

            {beforeAfterPairs.length === 0 && (
              <div className="text-center py-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <i className="fas fa-arrow-right-arrow-left text-2xl text-slate-300 mb-2"></i>
                <p className="text-[10px] font-black text-slate-400 uppercase">Aucune paire avant/après</p>
                <p className="text-[9px] text-slate-300">Cliquez sur "Ajouter une paire" pour commencer</p>
              </div>
            )}

            <div className="space-y-4">
              {beforeAfterPairs.map((pair, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative">
                  {/* Header de la paire */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#001E42] text-white text-[9px] font-black rounded-full flex items-center justify-center">{idx + 1}</span>
                      <input
                        className="bg-transparent text-xs font-black text-[#001E42] uppercase border-b border-transparent hover:border-slate-300 focus:border-[#FFB81C] outline-none px-1 py-0.5"
                        placeholder={`Phase ${idx + 1}`}
                        value={pair.label || ''}
                        onChange={e => updatePair(idx, 'label', e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePair(idx)}
                      className="w-7 h-7 flex items-center justify-center bg-red-50 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <i className="fas fa-trash text-[9px]"></i>
                    </button>
                  </div>

                  {/* Inputs avant / après */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[8px] font-black text-red-400 uppercase flex items-center gap-1">
                        <i className="fas fa-arrow-left"></i> Avant
                      </label>
                      <input
                        className="w-full bg-white p-3 rounded-lg border border-slate-200 text-xs"
                        placeholder="URL de l'image avant"
                        value={pair.before}
                        onChange={e => updatePair(idx, 'before', e.target.value)}
                      />
                      {pair.before && (
                        <div className="h-24 rounded-lg overflow-hidden bg-slate-200 mt-1">
                          <img src={pair.before} alt="Avant" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black text-green-500 uppercase flex items-center gap-1">
                        <i className="fas fa-arrow-right"></i> Après
                      </label>
                      <input
                        className="w-full bg-white p-3 rounded-lg border border-slate-200 text-xs"
                        placeholder="URL de l'image après"
                        value={pair.after}
                        onChange={e => updatePair(idx, 'after', e.target.value)}
                      />
                      {pair.after && (
                        <div className="h-24 rounded-lg overflow-hidden bg-slate-200 mt-1">
                          <img src={pair.after} alt="Après" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-grow py-4 bg-[#FFB81C] text-[#001E42] font-black uppercase text-xs rounded-xl shadow-lg">Enregistrer</button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-4 bg-slate-100 text-slate-500 font-black uppercase text-xs rounded-xl">Annuler</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminProjects;
