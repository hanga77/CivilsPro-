import api from './api';
import { GalleryItem } from '@/types';

export const galleryService = {
  getAll: async (): Promise<GalleryItem[]> => {
    const { data } = await api.get('/gallery');
    return data;
  },
  create: async (item: Partial<GalleryItem>): Promise<GalleryItem> => {
    const { data } = await api.post('/gallery', item);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/gallery/${id}`);
  },
};
