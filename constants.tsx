
import { Project, ProjectStatus } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Réhabilitation Structurelle',
    location: 'Douala, Cameroun',
    client: 'Privé',
    status: ProjectStatus.IN_PROGRESS,
    budget: 25000000,
    progress: 45,
    startDate: '2024-02-10',
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Villa Contemporaine P+1',
    location: 'Yaoundé, Cameroun',
    client: 'Particulier',
    status: ProjectStatus.PLANNING,
    budget: 75000000,
    progress: 5,
    startDate: '2024-05-01',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  }
];

export const COLORS = {
  primary: '#0033AD', // Bleu Logo Pi
  secondary: '#2563EB', 
  accent: '#3B82F6', 
  neutral: '#64748B' 
};
