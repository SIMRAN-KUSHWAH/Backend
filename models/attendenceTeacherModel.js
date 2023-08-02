import mongoose from "mongoose";
const attendanceTeacherSchema = new mongoose.Schema({
teacher: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'teachers',
  required: true,
  },
  date: {
    type: Date,
   default: () => new Date().setHours(0, 0, 0, 0),

  },
  punchIn: {
    type: String, // Change the type to String
    default: () => {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
  },
  punchOut: {
    type: String, // Change the type to String
    default: () => {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
  },
});

// const getIndianTimeString = () => {
//   const currentDate = new Date().toLocaleString("en-US", {
//     timeZone: "Asia/Kolkata", // Set the timezone to Indian Standard Time (IST)
//     hour12: false, // Use 24-hour format
//   });
//   return currentDate;
// };

attendanceTeacherSchema.index({ teacher: 1, date: 1 }, { unique: true });

export default mongoose.model("AttendanceTeacher", attendanceTeacherSchema);
