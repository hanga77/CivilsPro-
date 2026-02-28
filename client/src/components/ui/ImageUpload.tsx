import React, { useRef, useState } from 'react';
import { uploadService } from '@/services/uploadService';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, currentUrl, label = 'Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentUrl || '');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const { url } = await uploadService.upload(file);
      onUpload(url);
      setPreview(url);
    } catch {
      setPreview(currentUrl || '');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-slate-400 uppercase">{label}</label>
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          dragOver ? 'border-[#FFB81C] bg-yellow-50' : 'border-slate-200 hover:border-[#FFB81C]'
        }`}
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" />
        ) : (
          <div className="py-4">
            <i className="fas fa-cloud-arrow-up text-2xl text-slate-300 mb-2"></i>
            <p className="text-[10px] font-black text-slate-400 uppercase">Glisser ou cliquer pour uploader</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-slate-200 border-t-[#FFB81C] rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
