import mongoose, { Document } from 'mongoose';

export interface ITeamMember extends Document {
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

const teamMemberSchema = new mongoose.Schema<ITeamMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  order: { type: Number, default: 0 },
  socialLinks: {
    linkedin: { type: String, default: '' },
    email: { type: String, default: '' },
  },
});

teamMemberSchema.set('toJSON', {
  transform(_doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const TeamMember = mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);
export default TeamMember;
