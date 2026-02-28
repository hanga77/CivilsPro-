import api from './api';
import { ContactMessage } from '@/types';

export const messageService = {
  getAll: async (): Promise<ContactMessage[]> => {
    const { data } = await api.get('/messages');
    return data;
  },
  send: async (message: { name: string; email: string; subject: string; message: string }): Promise<ContactMessage> => {
    const { data } = await api.post('/messages', message);
    return data;
  },
  markAsRead: async (id: string): Promise<ContactMessage> => {
    const { data } = await api.put(`/messages/${id}`, { isRead: true });
    return data;
  },
};
