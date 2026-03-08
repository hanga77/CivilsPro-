import React, { useRef, useState } from 'react';
import { uploadService } from '@/services/uploadService';
import toast from 'react-hot-toast';

interface ImageInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  previewHeight?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ value, onChange, label = 'Image', previewHeight = 'h-28' }) => {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Fichier image requis'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Fichier trop volumineux (max 5 Mo)'); return; }
    setUploading(true);
    try {
      const { url } = await uploadService.upload(file);
      onChange(url);
      toast.success('Image uploadée');
    } catch {
      toast.error("Erreur d'upload — essayez avec un lien URL");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[9px] font-black text-slate-400 uppercase">{label}</label>
        <div className="flex bg-slate-100 rounded-lg overflow-hidden">
          <button type="button" onClick={() => setMode('upload')} className={`px-3 py-1 text-[7px] font-black uppercase transition-all ${mode === 'upload' ? 'bg-[#001E42] text-white' : 'text-slate-400 hover:text-slate-600'}`}>
            <i className="fas fa-upload mr-1"></i>Fichier
          </button>
          <button type="button" onClick={() => setMode('url')} className={`px-3 py-1 text-[7px] font-black uppercase transition-all ${mode === 'url' ? 'bg-[#001E42] text-white' : 'text-slate-400 hover:text-slate-600'}`}>
            <i className="fas fa-link mr-1"></i>Lien
          </button>
        </div>
      </div>

      {mode === 'url' ? (
        <input
          className="w-full bg-white p-3 rounded-xl border border-slate-200 text-xs"
          placeholder="https://example.com/image.jpg"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
            dragOver ? 'border-[#FFB81C] bg-yellow-50' : 'border-slate-200 hover:border-[#FFB81C] bg-slate-50'
          } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
          onClick={() => !uploading && fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        >
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          {uploading ? (
            <div className="py-6">
              <div className="w-6 h-6 border-2 border-slate-200 border-t-[#FFB81C] rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-[8px] font-black text-slate-400 uppercase">Upload en cours...</p>
            </div>
          ) : (
            <div className="py-5">
              <i className="fas fa-cloud-arrow-up text-lg text-slate-300"></i>
              <p className="text-[8px] font-black text-slate-400 uppercase mt-1">Glisser ou cliquer</p>
              <p className="text-[7px] text-slate-300">PNG, JPG, SVG — max 5 Mo</p>
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative group">
          <div className={`${previewHeight} rounded-xl overflow-hidden bg-slate-100`}>
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-[9px] hover:bg-red-600"
          >
            <i className="fas fa-xmark"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
