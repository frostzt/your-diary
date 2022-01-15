import mongoose from 'mongoose';

export interface NoteDoc extends mongoose.Document {
  user: string;
  body: string;
  title: string;
  updatedAt?: Date;
  createdAt?: Date;
}

const noteSchema = new mongoose.Schema<NoteDoc>({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.models.Note ||
  mongoose.model<NoteDoc>('Note', noteSchema);
