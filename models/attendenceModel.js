import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
student: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'students',
  required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    unique: true,
  },
  isStudentPresent: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.model("Attendance", attendanceSchema);
