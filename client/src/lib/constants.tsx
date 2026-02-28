
import { Project, ProjectStatus, Industry } from '@/types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Pont Métallique de la Sanaga',
    location: 'Edéa, Cameroun',
    client: 'Ministère des Travaux Publics (MINTP)',
    status: ProjectStatus.COMPLETED,
    budget: 450000000,
    progress: 100,
    startDate: '2022-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    description: 'Rénovation structurelle majeure, renforcement des tabliers et traitement anticorrosion haute performance.',
    sector: 'Ouvrages d\'Art'
  },
  {
    id: '2',
    name: 'Tour d\'Affaires PI-TOWER',
    location: 'Bonanjo, Douala',
    client: 'Groupe Immobilier S.A.',
    status: ProjectStatus.IN_PROGRESS,
    budget: 2500000000,
    progress: 45,
    startDate: '2024-02-01',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    description: 'Construction R+12 à usage mixte avec fondations spéciales sur pieux et façade bioclimatique.',
    sector: 'Bâtiment Civil'
  },
  {
    id: '3',
    name: 'Aménagement de la Pénétrante Est',
    location: 'Douala, Cameroun',
    client: 'CUD (Communauté Urbaine de Douala)',
    status: ProjectStatus.IN_PROGRESS,
    budget: 1200000000,
    progress: 75,
    startDate: '2023-06-10',
    thumbnail: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=1200',
    description: 'Travaux de terrassement, assainissement et bitumage en béton bitumineux haute densité.',
    sector: 'Infrastructures Routières'
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: '1',
    title: 'Génie Civil & Ouvrages d\'Art',
    icon: 'fa-bridge',
    description: 'Conception et réalisation de ponts, viaducs et structures complexes en béton armé ou charpente métallique.',
    imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Bâtiment & Gros Œuvre',
    icon: 'fa-building-columns',
    description: 'Expertise en construction résidentielle, commerciale et industrielle respectant les normes EUROCODES.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Hydraulique & Assainissement',
    icon: 'fa-faucet-drip',
    description: 'Réseaux d\'adduction d\'eau potable, stations d\'épuration et gestion des eaux pluviales en milieu urbain.',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    title: 'Audit & Expertise Technique',
    icon: 'fa-microscope',
    description: 'Diagnostics de structures existantes, essais de matériaux en laboratoire et assistance à maîtrise d\'ouvrage.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=80&w=1000'
  }
];

export const COLORS = {
  primary: '#001E42', // Midnight Navy
  accent: '#FFB81C',  // Industrial Gold
  white: '#FFFFFF',
  lightGray: '#F8FAFC',
  dark: '#020617'
};
