import api from './api';
import { Testimonial } from '@/types';

export const testimonialService = {
  getAll: async (): Promise<Testimonial[]> => {
    const { data } = await api.get('/testimonials');
    return data;
  },
  create: async (testimonial: Partial<Testimonial>): Promise<Testimonial> => {
    const { data } = await api.post('/testimonials', testimonial);
    return data;
  },
  update: async (id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> => {
    const { data } = await api.put(`/testimonials/${id}`, testimonial);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/testimonials/${id}`);
  },
};
