
import { Project, ProjectStatus, Industry } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Pont Métallique de la Sanaga',
    location: 'Edéa, Cameroun',
    client: 'Ministère des Travaux Publics',
    status: ProjectStatus.COMPLETED,
    budget: 450000000,
    progress: 100,
    startDate: '2022-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    description: 'Rénovation structurelle majeure et renforcement des piliers porteurs.',
    sector: 'Infrastructure Routière'
  },
  {
    id: '2',
    name: 'Complexe Industriel PI-HUB',
    location: 'Zone Industrielle Magzi, Douala',
    client: 'Investisseurs Privés',
    status: ProjectStatus.IN_PROGRESS,
    budget: 850000000,
    progress: 65,
    startDate: '2023-11-01',
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=1200',
    description: 'Construction d\'un entrepôt logistique de 5000m² avec structure mixte acier-béton.',
    sector: 'Bâtiment Industriel'
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: '1',
    title: 'Énergie & Réseaux',
    icon: 'fa-bolt-lightning',
    description: 'Infrastructures haute tension et centrales de production.',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Eau & Environnement',
    icon: 'fa-droplet',
    description: 'Systèmes de traitement et réseaux d\'adduction massifs.',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Transports',
    icon: 'fa-road',
    description: 'Routes nationales, ouvrages d\'art et logistique portuaire.',
    imageUrl: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800'
  }
];

export const COLORS = {
  primary: '#001E42', // Midnight Navy
  accent: '#FFB81C',  // Industrial Gold
  white: '#FFFFFF',
  lightGray: '#F8FAFC'
};
