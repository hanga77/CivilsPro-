import React, { useState, useEffect, useRef } from 'react';
import { SiteConfig } from '@/types';
import { configService } from '@/services/configService';
import { uploadService } from '@/services/uploadService';
import toast from 'react-hot-toast';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  previewClass?: string;
}

const ImageField: React.FC<ImageFieldProps> = ({ label, value, onChange, previewClass = 'h-24 w-24' }) => {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'url' | 'upload'>(value?.startsWith('http') ? 'url' : 'url');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Fichier image requis'); return; }
    setUploading(true);
    try {
      const { url } = await uploadService.upload(file);
      onChange(url);
      toast.success('Image uploadée');
    } catch {
      toast.error('Erreur d\'upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase font-black text-slate-400">{label}</label>
        <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1 text-[8px] font-black uppercase ${mode === 'url' ? 'bg-[#001E42] text-white' : 'text-slate-400'}`}
          >
            <i className="fas fa-link mr-1"></i>Lien
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1 text-[8px] font-black uppercase ${mode === 'upload' ? 'bg-[#001E42] text-white' : 'text-slate-400'}`}
          >
            <i className="fas fa-upload mr-1"></i>Fichier
          </button>
        </div>
      </div>

      {mode === 'url' ? (
        <input
          className="w-full bg-white p-3 rounded-lg border border-slate-200 text-sm"
          placeholder="https://example.com/image.png"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all hover:border-[#FFB81C] ${uploading ? 'opacity-50' : ''}`}
          onClick={() => !uploading && fileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        >
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          {uploading ? (
            <div className="py-2">
              <div className="w-6 h-6 border-2 border-slate-200 border-t-[#FFB81C] rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-[9px] font-black text-slate-400 uppercase">Upload en cours...</p>
            </div>
          ) : (
            <div className="py-2">
              <i className="fas fa-cloud-arrow-up text-xl text-slate-300 mb-1"></i>
              <p className="text-[9px] font-black text-slate-400 uppercase">Glisser un fichier ou cliquer</p>
              <p className="text-[8px] text-slate-300">PNG, JPG, SVG — max 5 Mo</p>
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="flex items-center gap-3 pt-2">
          <div className={`${previewClass} rounded-lg overflow-hidden bg-slate-200 flex-shrink-0`}>
            <img src={value} alt="Preview" className="w-full h-full object-contain" />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-[8px] text-slate-400 font-bold truncate">{value}</p>
            <button type="button" onClick={() => onChange('')} className="text-[8px] font-black text-red-400 uppercase hover:text-red-600 mt-1">
              <i className="fas fa-trash mr-1"></i>Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminSiteConfig: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { configService.get().then(setConfig).catch(() => {}); }, []);

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try { await configService.update(config); toast.success('Configuration sauvegardée'); }
    catch { toast.error('Erreur'); }
    finally { setSaving(false); }
  };

  if (!config) return <div className="text-center py-20 text-slate-400">Chargement...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-black text-[#001E42] uppercase">Configuration du Site</h3>
        <button onClick={handleSave} disabled={saving} className="px-6 py-3 bg-[#FFB81C] text-[#001E42] font-black uppercase text-[10px] rounded-lg shadow-lg hover:bg-yellow-400 disabled:opacity-50">
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Identité */}
      <div>
        <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Identité de l'entreprise</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400">Nom Entreprise</label>
            <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.companyName} onChange={e => setConfig({ ...config, companyName: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400">Suffixe</label>
            <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.companySuffix} onChange={e => setConfig({ ...config, companySuffix: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Images — Logo & Bannière */}
      <div>
        <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Logo & Bannière</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageField
            label="Logo de l'entreprise"
            value={config.logoUrl}
            onChange={url => setConfig({ ...config, logoUrl: url })}
            previewClass="h-20 w-20"
          />
          <ImageField
            label="Bannière Hero (page d'accueil)"
            value={config.heroImage}
            onChange={url => setConfig({ ...config, heroImage: url })}
            previewClass="h-20 w-40"
          />
        </div>
      </div>

      {/* Textes */}
      <div>
        <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Textes du site</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400">Titre Principal (Hero)</label>
            <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.slogan} onChange={e => setConfig({ ...config, slogan: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400">Sous-Titre (Hero)</label>
            <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.subSlogan} onChange={e => setConfig({ ...config, subSlogan: e.target.value })} />
          </div>
        </div>
        <div className="space-y-2 mt-6">
          <label className="text-[10px] uppercase font-black text-slate-400">À propos (Footer)</label>
          <textarea rows={4} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.footerAbout} onChange={e => setConfig({ ...config, footerAbout: e.target.value })} />
        </div>
      </div>

      {/* SEO */}
      <div>
        <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
          <i className="fas fa-magnifying-glass mr-2"></i>SEO & Référencement
        </h4>
        <p className="text-[9px] text-slate-400 mb-4 italic">Ces champs impactent le titre, la description et l'image Open Graph de votre site dans les moteurs de recherche et réseaux sociaux.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400">Titre SEO (balise title)</label>
            <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.seoTitle || ''} onChange={e => setConfig({ ...config, seoTitle: e.target.value } as any)} placeholder={`${config.companyName} | ${config.companySuffix}`} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400">Description SEO (meta description)</label>
            <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.seoDescription || ''} onChange={e => setConfig({ ...config, seoDescription: e.target.value } as any)} placeholder="Description de l'entreprise pour Google..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400">Mots-clés SEO</label>
            <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.seoKeywords || ''} onChange={e => setConfig({ ...config, seoKeywords: e.target.value } as any)} placeholder="BTP, Génie Civil, Cameroun..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400">URL Canonique</label>
            <input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.canonicalUrl || ''} onChange={e => setConfig({ ...config, canonicalUrl: e.target.value } as any)} placeholder="https://piconstruction.cm" />
          </div>
        </div>
        {/* SEO Preview */}
        <div className="mt-6 p-4 bg-white border border-slate-200 rounded-xl">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Aperçu Google</p>
          <div className="space-y-1">
            <p className="text-blue-700 text-lg font-bold truncate">{(config as any).seoTitle || `${config.companyName} | ${config.companySuffix}`}</p>
            <p className="text-green-700 text-xs">{(config as any).canonicalUrl || 'https://piconstruction.cm'}</p>
            <p className="text-slate-500 text-sm line-clamp-2">{(config as any).seoDescription || config.subSlogan}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div>
        <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Chiffres clés</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2"><label className="text-[10px] uppercase font-black text-slate-400">Stat: Projets</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.stats.projectsCount} onChange={e => setConfig({ ...config, stats: { ...config.stats, projectsCount: e.target.value } })} /></div>
          <div className="space-y-2"><label className="text-[10px] uppercase font-black text-slate-400">Stat: Expérience</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.stats.expertiseYears} onChange={e => setConfig({ ...config, stats: { ...config.stats, expertiseYears: e.target.value } })} /></div>
          <div className="space-y-2"><label className="text-[10px] uppercase font-black text-slate-400">Stat: Experts</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.stats.teamSize} onChange={e => setConfig({ ...config, stats: { ...config.stats, teamSize: e.target.value } })} /></div>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Coordonnées</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-[10px] uppercase font-black text-slate-400">Email Contact</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.contactEmail} onChange={e => setConfig({ ...config, contactEmail: e.target.value })} /></div>
          <div className="space-y-2"><label className="text-[10px] uppercase font-black text-slate-400">Localisation</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.contactLocation} onChange={e => setConfig({ ...config, contactLocation: e.target.value })} /></div>
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div>
        <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Réseaux sociaux</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-[10px] uppercase font-black text-slate-400"><i className="fab fa-facebook mr-1"></i>Facebook</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.socialLinks.facebook} onChange={e => setConfig({ ...config, socialLinks: { ...config.socialLinks, facebook: e.target.value } })} /></div>
          <div className="space-y-2"><label className="text-[10px] uppercase font-black text-slate-400"><i className="fab fa-linkedin mr-1"></i>LinkedIn</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.socialLinks.linkedin} onChange={e => setConfig({ ...config, socialLinks: { ...config.socialLinks, linkedin: e.target.value } })} /></div>
          <div className="space-y-2"><label className="text-[10px] uppercase font-black text-slate-400"><i className="fab fa-instagram mr-1"></i>Instagram</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.socialLinks.instagram} onChange={e => setConfig({ ...config, socialLinks: { ...config.socialLinks, instagram: e.target.value } })} /></div>
          <div className="space-y-2"><label className="text-[10px] uppercase font-black text-slate-400"><i className="fab fa-whatsapp mr-1"></i>WhatsApp</label><input className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200" value={config.socialLinks.whatsapp} onChange={e => setConfig({ ...config, socialLinks: { ...config.socialLinks, whatsapp: e.target.value } })} /></div>
        </div>
      </div>
    </div>
  );
};

export default AdminSiteConfig;
