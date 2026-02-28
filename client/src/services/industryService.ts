import api from './api';
import { Industry } from '@/types';

export const industryService = {
  getAll: async (): Promise<Industry[]> => {
    const { data } = await api.get('/industries');
    return data;
  },
  create: async (industry: Partial<Industry>): Promise<Industry> => {
    const { data } = await api.post('/industries', industry);
    return data;
  },
  update: async (id: string, industry: Partial<Industry>): Promise<Industry> => {
    const { data } = await api.put(`/industries/${id}`, industry);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/industries/${id}`);
  },
};
