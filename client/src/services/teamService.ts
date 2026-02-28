import api from './api';
import { TeamMember } from '@/types';

export const teamService = {
  getAll: async (): Promise<TeamMember[]> => {
    const { data } = await api.get('/team');
    return data;
  },
  create: async (member: Partial<TeamMember>): Promise<TeamMember> => {
    const { data } = await api.post('/team', member);
    return data;
  },
  update: async (id: string, member: Partial<TeamMember>): Promise<TeamMember> => {
    const { data } = await api.put(`/team/${id}`, member);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/team/${id}`);
  },
};
