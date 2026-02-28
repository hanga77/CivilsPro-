import mongoose, { Document } from 'mongoose';

export interface IGalleryItem extends Document {
  category: string;
  url: string;
  title: string;
  projectId?: string;
  description?: string;
  uploadedAt?: Date;
}

const galleryItemSchema = new mongoose.Schema<IGalleryItem>({
  category: { type: String, required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  projectId: { type: String, default: '' },
  description: { type: String, default: '' },
  uploadedAt: { type: Date, default: Date.now },
});

galleryItemSchema.set('toJSON', {
  transform(_doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const GalleryItem = mongoose.model<IGalleryItem>('GalleryItem', galleryItemSchema);
export default GalleryItem;
