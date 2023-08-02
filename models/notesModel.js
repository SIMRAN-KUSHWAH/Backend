import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teachers',
    // required: true,
  },
  Class: {
    type: Number,
    // required: true,
  },
  subject: {
    type: String,
    // required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model('NotesPdf', notesSchema);

export default Notes;