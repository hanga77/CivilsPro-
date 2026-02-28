import mongoose, { Document } from 'mongoose';

export interface IIndustry extends Document {
  title: string;
  icon: string;
  description: string;
  imageUrl: string;
}

const industrySchema = new mongoose.Schema<IIndustry>({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
});

industrySchema.set('toJSON', {
  transform(_doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Industry = mongoose.model<IIndustry>('Industry', industrySchema);
export default Industry;
