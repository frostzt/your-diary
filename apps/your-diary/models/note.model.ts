import mongoose from 'mongoose';

interface NoteAttr {
  user: string;
  body: string;
  title: string;
  updatedAt: Date;
  createdAt: Date;
}

interface NoteModel extends mongoose.Model<NoteDoc> {
  build: (attrs: NoteAttr) => NoteDoc;
}

export interface NoteDoc extends mongoose.Document {
  user: string;
  body: string;
  title: string;
  updatedAt: Date;
  createdAt: Date;
}

const noteSchema = new mongoose.Schema<NoteDoc>(
  {
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
  },
  {
    toJSON: {
      versionKey: false,
      transform: function serializeDoc(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// the statics needs to come before the User object is created
// eslint-disable-next-line @typescript-eslint/no-use-before-define
noteSchema.statics.build = (attrs: NoteAttr) => new Note(attrs);

const Note = mongoose.model<NoteDoc, NoteModel>('note', noteSchema);

export default Note;
