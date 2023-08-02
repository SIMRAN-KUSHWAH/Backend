// Import required modules
import AttendanceTeacher from '../models/attendenceTeacherModel.js';
export const createAttendanceTeacher = async (req, res) => {
  try {
    const { teacher, date,} = req.body;

    // Create a new AttendanceTeacher document with punchIn and punchOut defaults
    const newAttendance = new AttendanceTeacher({
      teacher,
      date,
    
    });

    // Save the document to the database
    const savedAttendance = await newAttendance.save();

    res.status(201).json(savedAttendance); // Send the saved attendance data as the response
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'Failed to create attendance' });
  }
};


export const updateAttendanceByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params; // Retrieve the teacher ID from URL parameters
    console.log('Teacher ID:', teacherId);

    // Find the existing AttendanceTeacher document by teacher ID
    const existingAttendance = await AttendanceTeacher.findOne({ teacher: teacherId });

    if (existingAttendance) {
      // If an existing attendance record is found, update the punchOut time to the current Indian time
      const indianCurrentTime = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      existingAttendance.punchOut = indianCurrentTime;

      const updatedAttendance = await existingAttendance.save();

      res.status(200).json(updatedAttendance); // Send the updated attendance data as the response
    } else {
      // If no existing attendance record is found, send an error response
      res.status(404).json({ error: 'Attendance record not found' });
    }
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};


export const getAttendenceByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params; // Retrieve the teacher ID from URL parameters

    // Find all AttendanceTeacher documents for the specified teacher in the database
    const allAttendance = await AttendanceTeacher.find({ teacher: teacherId });

    res.status(200).json(allAttendance); // Send all attendance data as the response
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
}