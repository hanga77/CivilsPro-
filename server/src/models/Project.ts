import mongoose, { Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  location: string;
  client: string;
  status: string;
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

const projectSchema = new mongoose.Schema<IProject>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  client: { type: String, required: true },
  status: {
    type: String,
    enum: ['En Planification', 'En Cours', 'Terminé', 'En Pause'],
    default: 'En Planification',
  },
  budget: { type: Number, required: true },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  startDate: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  description: { type: String, default: '' },
  sector: { type: String, default: '' },
  endDate: { type: String, default: '' },
  beforeAfterImages: [{
    before: { type: String, required: true },
    after: { type: String, required: true },
    label: { type: String, default: '' },
  }],
  galleryImages: [{ type: String }],
});

projectSchema.set('toJSON', {
  transform(_doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;
