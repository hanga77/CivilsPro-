import api from './api';
import { Project } from '@/types';

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get('/projects');
    return data;
  },
  getById: async (id: string): Promise<Project> => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },
  create: async (project: Partial<Project>): Promise<Project> => {
    const { data } = await api.post('/projects', project);
    return data;
  },
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const { data } = await api.put(`/projects/${id}`, project);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};
