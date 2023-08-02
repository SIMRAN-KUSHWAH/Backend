import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    // required: true,
  },
  subject: {
    type: String,
   
  },
  marksObtained: {
    type: Number,
    
  },
  examDate: {
    type: Date,
    
  },
});

const Marks = mongoose.model('Marks', marksSchema);

export default Marks;
