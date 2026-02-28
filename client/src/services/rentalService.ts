import api from './api';
import { RentalItem } from '@/types';

export const rentalService = {
  getAll: async (): Promise<RentalItem[]> => {
    const { data } = await api.get('/rentals');
    return data;
  },
  create: async (item: Partial<RentalItem>): Promise<RentalItem> => {
    const { data } = await api.post('/rentals', item);
    return data;
  },
  update: async (id: string, item: Partial<RentalItem>): Promise<RentalItem> => {
    const { data } = await api.put(`/rentals/${id}`, item);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/rentals/${id}`);
  },
};
