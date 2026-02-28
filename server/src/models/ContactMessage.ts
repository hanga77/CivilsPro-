import mongoose, { Document } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

const contactMessageSchema = new mongoose.Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
  isRead: { type: Boolean, default: false },
});

contactMessageSchema.set('toJSON', {
  transform(_doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);
export default ContactMessage;
