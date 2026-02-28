import api from './api';
import { SiteConfig } from '@/types';

export const configService = {
  get: async (): Promise<SiteConfig> => {
    const { data } = await api.get('/config');
    return data;
  },
  update: async (config: Partial<SiteConfig>): Promise<SiteConfig> => {
    const { data } = await api.put('/config', config);
    return data;
  },
};
