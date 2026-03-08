import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Industry from '../models/Industry.js';
import RentalItem from '../models/RentalItem.js';
import GalleryItem from '../models/GalleryItem.js';
import SiteConfig from '../models/SiteConfig.js';
import TeamMember from '../models/TeamMember.js';
import Testimonial from '../models/Testimonial.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pi-construction';

const projects = [
  {
    name: 'Pont Métallique de la Sanaga',
    location: 'Edéa, Cameroun',
    client: 'Ministère des Travaux Publics (MINTP)',
    status: 'Terminé',
    budget: 450000000,
    progress: 100,
    startDate: '2022-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    description: 'Rénovation structurelle majeure, renforcement des tabliers et traitement anticorrosion haute performance.',
    sector: "Ouvrages d'Art",
  },
  {
    name: "Tour d'Affaires PI-TOWER",
    location: 'Bonanjo, Douala',
    client: 'Groupe Immobilier S.A.',
    status: 'En Cours',
    budget: 2500000000,
    progress: 45,
    startDate: '2024-02-01',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    description: 'Construction R+12 à usage mixte avec fondations spéciales sur pieux et façade bioclimatique.',
    sector: 'Bâtiment Civil',
  },
  {
    name: 'Aménagement de la Pénétrante Est',
    location: 'Douala, Cameroun',
    client: 'CUD (Communauté Urbaine de Douala)',
    status: 'En Cours',
    budget: 1200000000,
    progress: 75,
    startDate: '2023-06-10',
    thumbnail: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=1200',
    description: 'Travaux de terrassement, assainissement et bitumage en béton bitumineux haute densité.',
    sector: 'Infrastructures Routières',
  },
];

const industries = [
  {
    title: "Génie Civil & Ouvrages d'Art",
    icon: 'fa-bridge',
    description: 'Conception et réalisation de ponts, viaducs et structures complexes en béton armé ou charpente métallique.',
    imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Bâtiment & Gros Œuvre',
    icon: 'fa-building-columns',
    description: 'Expertise en construction résidentielle, commerciale et industrielle respectant les normes EUROCODES.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Hydraulique & Assainissement',
    icon: 'fa-faucet-drip',
    description: "Réseaux d'adduction d'eau potable, stations d'épuration et gestion des eaux pluviales en milieu urbain.",
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Audit & Expertise Technique',
    icon: 'fa-microscope',
    description: "Diagnostics de structures existantes, essais de matériaux en laboratoire et assistance à maîtrise d'ouvrage.",
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=80&w=1000',
  },
];

const rentalItems = [
  { name: 'Pelle Hydraulique CAT 320', icon: 'fa-tractor', price: '450.000 FCFA/Jour', desc: 'Capacité godet 1.2m³, idéale pour terrassements massifs.', isAvailable: true },
  { name: 'Niveleuse 140K', icon: 'fa-shovels', price: '600.000 FCFA/Jour', desc: 'Précision de nivellement pour infrastructures routières.', isAvailable: true },
  { name: 'Camion Malaxeur 8m³', icon: 'fa-truck-droplet', price: '180.000 FCFA/Rotation', desc: "Transport et brassage de béton prêt à l'emploi.", isAvailable: true },
  { name: 'Grue à Tour 50m', icon: 'fa-building', price: 'Sur Devis', desc: 'Levage lourd pour chantiers de bâtiments R+10 et plus.', isAvailable: true },
];

const galleryItems = [
  { category: 'Ingénierie', url: 'https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=80&w=800', title: "Bureau d'études" },
  { category: 'Chantier', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800', title: 'Chantier en cours' },
  { category: 'Infrastructure', url: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800', title: 'Voirie urbaine' },
  { category: 'Bâtiment', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', title: 'PI-TOWER' },
];

const teamMembers = [
  { name: 'Ing. Paul Nkamga', role: 'Directeur Général', bio: 'Ingénieur en Génie Civil avec 20 ans d\'expérience dans les infrastructures lourdes.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', order: 0 },
  { name: 'Dr. Marie Fotso', role: 'Directrice Technique', bio: 'Docteur en structures béton armé, spécialiste des ouvrages d\'art.', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', order: 1 },
  { name: 'Ing. Jean Mbarga', role: 'Chef de Projets', bio: 'Expert en gestion de chantiers complexes et coordination multi-lots.', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', order: 2 },
  { name: 'Mme. Claire Essomba', role: 'Responsable Qualité', bio: 'Certification ISO 9001, audit qualité et conformité normes EUROCODES.', photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400', order: 3 },
];

const testimonials = [
  { clientName: 'M. Etienne Kamga', clientRole: 'Directeur des Infrastructures', company: 'MINTP', content: 'PI-CONSTRUCTION a livré le pont de la Sanaga dans les délais avec une qualité irréprochable. Leur rigueur technique est exemplaire.', rating: 5, isVisible: true },
  { clientName: 'Mme. Sylvie Tchana', clientRole: 'Présidente', company: 'Groupe Immobilier S.A.', content: 'Le projet PI-TOWER avance remarquablement bien. L\'équipe fait preuve d\'un professionnalisme rare dans le secteur.', rating: 5, isVisible: true },
  { clientName: 'Ing. Robert Ebosse', clientRole: 'Directeur Technique', company: 'CUD', content: 'La Pénétrante Est est un chantier complexe que PI-CONSTRUCTION maîtrise avec brio. Nous sommes pleinement satisfaits.', rating: 4, isVisible: true },
];

const siteConfig = {
  _id: 'singleton',
  companyName: 'PI-CONSTRUCTION',
  companySuffix: 'BTP SARL',
  slogan: "L'EXCELLENCE TECHNIQUE AU SERVICE DE L'INFRASTRUCTURE.",
  subSlogan: 'Ingénierie de précision, maîtrise du béton armé et solutions de construction durable pour les défis de demain.',
  logoUrl: '/logo.svg',
  accentColor: '#FFB81C',
  primaryColor: '#001E42',
  heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070',
  contactPhones: ['(+237) 671 34 54 41', '(+237) 699 46 63 21'],
  contactEmail: 'contact@piconstruction.cm',
  contactLocation: 'Douala - Yaoundé - Déploiement Afrique Centrale',
  footerAbout: "PI-CONSTRUCTION BTP SARL est un acteur majeur du Génie Civil, spécialisé dans les infrastructures lourdes, le bâtiment industriel et l'expertise en structures complexes.",
  stats: {
    projectsCount: '150+',
    expertiseYears: '12 ANS',
    teamSize: '45 EXPERTS',
  },
  socialLinks: {
    facebook: 'https://facebook.com/piconstruction',
    linkedin: 'https://linkedin.com/company/piconstruction',
    instagram: '',
    whatsapp: '237671345441',
  },
};

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected. Clearing existing data...');

  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Industry.deleteMany({}),
    RentalItem.deleteMany({}),
    GalleryItem.deleteMany({}),
    SiteConfig.deleteMany({}),
    TeamMember.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  // Admin user — must use .save() for bcrypt pre-save hook
  const admin = new User({
    name: 'Admin PI-Construction',
    email: 'admin@piconstruction.cm',
    password: 'admin123',
    role: 'admin',
  });
  await admin.save();
  console.log('Admin user created (admin@piconstruction.cm / admin123)');

  await Project.insertMany(projects);
  console.log(`${projects.length} projects seeded`);

  await Industry.insertMany(industries);
  console.log(`${industries.length} industries seeded`);

  await RentalItem.insertMany(rentalItems);
  console.log(`${rentalItems.length} rental items seeded`);

  await GalleryItem.insertMany(galleryItems);
  console.log(`${galleryItems.length} gallery items seeded`);

  await SiteConfig.create(siteConfig);
  console.log('Site config seeded');

  await TeamMember.insertMany(teamMembers);
  console.log(`${teamMembers.length} team members seeded`);

  await Testimonial.insertMany(testimonials);
  console.log(`${testimonials.length} testimonials seeded`);

  await mongoose.disconnect();
  console.log('Seed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
