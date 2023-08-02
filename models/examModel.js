import mongoose from 'mongoose';

const examTimeTableSchema = new mongoose.Schema(
  {
  
        subject: {
          type: String,
         
        },
        class: {
          type: String,
          default: 'all classes',
        },
        date: {
          type: Date,
        
        },
        startTime: {
          type: String,
       
        },
        endTime: {
          type: String,
          
        },
        venue: {
          type: String,
         
        },
    
  },
  { timestamps: true }
);

export default mongoose.model('ExamTimeTable', examTimeTableSchema);
