import mongoose from 'mongoose';

export interface ISiteConfig {
  _id: string;
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
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
}

const siteConfigSchema = new mongoose.Schema<ISiteConfig>({
  _id: { type: String, default: 'singleton' },
  companyName: { type: String, required: true },
  companySuffix: { type: String, default: '' },
  slogan: { type: String, default: '' },
  subSlogan: { type: String, default: '' },
  logoUrl: { type: String, default: '' },
  accentColor: { type: String, default: '#FFB81C' },
  primaryColor: { type: String, default: '#001E42' },
  heroImage: { type: String, default: '' },
  contactPhones: { type: [String], default: [] },
  contactEmail: { type: String, default: '' },
  contactLocation: { type: String, default: '' },
  footerAbout: { type: String, default: '' },
  stats: {
    projectsCount: { type: String, default: '' },
    expertiseYears: { type: String, default: '' },
    teamSize: { type: String, default: '' },
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
  },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  seoKeywords: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
});

siteConfigSchema.set('toJSON', {
  transform(_doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const SiteConfig = mongoose.model<ISiteConfig>('SiteConfig', siteConfigSchema);
export default SiteConfig;
