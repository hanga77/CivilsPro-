import mongoose, { Document } from 'mongoose';

export interface IRentalItem extends Document {
  name: string;
  icon: string;
  price: string;
  desc?: string;
  imageUrl?: string;
  isAvailable?: boolean;
}

const rentalItemSchema = new mongoose.Schema<IRentalItem>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  price: { type: String, required: true },
  desc: { type: String },
  imageUrl: { type: String, default: '' },
  isAvailable: { type: Boolean, default: true },
});

rentalItemSchema.set('toJSON', {
  transform(_doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const RentalItem = mongoose.model<IRentalItem>('RentalItem', rentalItemSchema);
export default RentalItem;
