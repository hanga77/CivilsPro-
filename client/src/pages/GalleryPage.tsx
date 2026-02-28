import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@/types';
import { galleryService } from '@/services/galleryService';
import ScrollReveal from '@/components/ui/ScrollReveal';
import WatermarkedImage from '@/components/ui/WatermarkedImage';
import FilterTabs from '@/components/ui/FilterTabs';
import Modal from '@/components/ui/Modal';

const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([
    { id: '1', category: 'Ingénierie', url: 'https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=80&w=800', title: "Bureau d'études" },
    { id: '2', category: 'Chantier', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800', title: 'Chantier en cours' },
    { id: '3', category: 'Infrastructure', url: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800', title: 'Voirie' },
    { id: '4', category: 'Bâtiment', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', title: 'PI-TOWER' },
    { id: '5', category: 'Chantier', url: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800', title: 'Gros Œuvre' },
    { id: '6', category: 'Ingénierie', url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800', title: 'Pont métallique' },
  ]);
  const [filter, setFilter] = useState('Tout');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    galleryService.getAll().then(data => { if (data.length > 0) setItems(data); }).catch(() => {});
  }, []);

  const categories = ['Tout', ...new Set(items.map(i => i.category))];
  const filtered = filter === 'Tout' ? items : items.filter(i => i.category === filter);

  return (
    <div className="animate-fadeIn">
      <div className="pt-40 pb-32 bg-[#020617] min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <header className="mb-16 text-center">
              <h4 className="text-[10px] font-black text-[#FFB81C] uppercase tracking-[0.4em] mb-4">Portfolio Visuel</h4>
              <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">Notre <span className="text-[#FFB81C]">Galerie.</span></h2>
            </header>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex justify-center mb-12">
              <FilterTabs filters={categories} activeFilter={filter} onFilterChange={setFilter} />
            </div>
          </ScrollReveal>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.05}>
                <div className="break-inside-avoid cursor-pointer rounded-2xl overflow-hidden" onClick={() => setLightboxItem(item)}>
                  <WatermarkedImage
                    src={item.url}
                    alt={item.title}
                    className={`w-full ${i % 3 === 0 ? 'h-80' : i % 3 === 1 ? 'h-64' : 'h-72'}`}
                  />
                  <div className="bg-slate-900 p-4">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">{item.title}</h3>
                    <p className="text-[9px] text-[#FFB81C] font-black uppercase tracking-widest">{item.category}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Modal isOpen={!!lightboxItem} onClose={() => setLightboxItem(null)} maxWidth="max-w-5xl">
        {lightboxItem && (
          <div>
            <WatermarkedImage src={lightboxItem.url} alt={lightboxItem.title} className="w-full max-h-[70vh] rounded-xl" />
            <div className="mt-4">
              <h3 className="text-xl font-black text-[#001E42] uppercase">{lightboxItem.title}</h3>
              <p className="text-sm text-[#FFB81C] font-black uppercase tracking-widest">{lightboxItem.category}</p>
              {lightboxItem.description && <p className="text-slate-500 mt-2">{lightboxItem.description}</p>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GalleryPage;
