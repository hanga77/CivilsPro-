
export enum ProjectStatus {
  PLANNING = 'En Planification',
  IN_PROGRESS = 'En Cours',
  COMPLETED = 'Terminé',
  ON_HOLD = 'En Pause'
}

export interface Project {
  id: string;
  name: string;
  location: string;
  client: string;
  status: ProjectStatus;
  budget: number;
  progress: number;
  startDate: string;
  thumbnail: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  url: string;
  title: string;
}

export interface RentalItem {
  id: string;
  name: string;
  icon: string;
  price: string;
  desc?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface SiteConfig {
  companyName: string;
  companySuffix: string;
  slogan: string;
  logoUrl: string;
  accentColor: string;
  heroImage: string;
  contactPhones: string[];
  contactLocation: string;
  footerAbout: string;
  socialLinks: {
    facebook: string;
    linkedin: string;
    instagram: string;
    whatsapp: string;
  };
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'engineer' | 'client';
  email: string;
}
