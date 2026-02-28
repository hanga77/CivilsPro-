import mongoose, { Document } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  clientRole: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  isVisible: boolean;
}

const testimonialSchema = new mongoose.Schema<ITestimonial>({
  clientName: { type: String, required: true },
  clientRole: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  avatarUrl: { type: String, default: '' },
  isVisible: { type: Boolean, default: true },
});

testimonialSchema.set('toJSON', {
  transform(_doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
export default Testimonial;
