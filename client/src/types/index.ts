
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
  endDate?: string;
  thumbnail: string;
  description: string;
  sector: string;
  beforeAfterImages?: { before: string; after: string; label?: string }[];
  galleryImages?: string[];
}

export interface GalleryItem {
  id: string;
  category: string;
  url: string;
  title: string;
  projectId?: string;
  description?: string;
  uploadedAt?: string;
}

export interface RentalItem {
  id: string;
  name: string;
  icon: string;
  price: string;
  desc?: string;
  imageUrl?: string;
  isAvailable?: boolean;
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

export interface Industry {
  id: string;
  title: string;
  icon: string;
  description: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  order: number;
  socialLinks?: {
    linkedin?: string;
    email?: string;
  };
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  isVisible: boolean;
}

export interface SiteConfig {
  companyName: string;
  companySuffix: string;
  slogan: string;
  subSlogan: string;
  logoUrl: string;
  accentColor: string;
  primaryColor: string;
  heroImage: string;
  contactPhones: string[];
  contactEmail: string;
  contactLocation: string;
  footerAbout: string;
  stats: {
    projectsCount: string;
    expertiseYears: string;
    teamSize: string;
  };
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
