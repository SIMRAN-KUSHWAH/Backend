import mongoose from 'mongoose';

// Define the Time Table schema
const timetableSchema = new mongoose.Schema({
  className:{
    type: String,
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Class Scheduled",
  },
});

// Create the Time Table model
const Timetable = mongoose.model('Timetable', timetableSchema);

export default Timetable;
