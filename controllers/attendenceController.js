// Import required modules
import Attendance from '../models/attendenceModel.js';

// POST - Create a new attendance entry
const createAttendance = async (req, res) => {
  try {
    // Extract data from the request body
    const { attendanceData } = req.body;

    if (!Array.isArray(attendanceData)) {
      return res.status(400).json({ error: 'attendanceData should be an array' });
    }

    // Save each attendance entry from the array to the database
    const savedAttendanceData = await Promise.all(
      attendanceData.map(async (attendanceEntry) => {
        const { studentId, isStudentPresent, isTeacherPresent } = attendanceEntry;
        const newAttendance = new Attendance({
          student: studentId,
          isStudentPresent,
         
        });
        return await newAttendance.save();
      })
    );

    // Return the created attendance entries in the response
    res.status(201).json(savedAttendanceData);
  } catch (error) {
    // Handle errors
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'Error creating attendance' });
  }
};


// GET - Get all attendance entries
const getAllAttendance = async (req, res) => {
  try {
    // Fetch all attendance entries from the database
    const allAttendance = await Attendance.find().populate('student');

    // Return the attendance entries in the response
    res.status(200).json(allAttendance);
  } catch (error) {
    // Handle errors
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Error fetching attendance' });
  }
};




// GET - Get a single attendance entry by ID
const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the attendance entry by ID from the database
    const attendance = await Attendance.findById(id);

    // If the attendance entry is not found, return an error response
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance not found' });
    }

    // Return the attendance entry in the response
    res.status(200).json(attendance);
  } catch (error) {
    // Handle errors
    console.error('Error fetching attendance by ID:', error);
    res.status(500).json({ error: 'Error fetching attendance' });
  }
};

// PUT - Update a single attendance entry by ID
const updateAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { isStudentPresent, isTeacherPresent } = req.body;

    // Find the attendance entry by ID and update its properties
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      {
        isStudentPresent,
        isTeacherPresent,
      },
      { new: true } // Return the updated attendance entry
    );

    // If the attendance entry is not found, return an error response
    if (!updatedAttendance) {
      return res.status(404).json({ error: 'Attendance not found' });
    }

    // Return the updated attendance entry in the response
    res.status(200).json(updatedAttendance);
  } catch (error) {
    // Handle errors
    console.error('Error updating attendance by ID:', error);
    res.status(500).json({ error: 'Error updating attendance' });
  }
};



const getAttendanceByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch attendance entries by student ID from the database
    const attendance = await Attendance.find({ student: studentId });

    // Return the attendance entries in the response
    res.status(200).json(attendance);
  } catch (error) {
    // Handle errors
    console.error('Error fetching attendance by student ID:', error);
    res.status(500).json({ error: 'Error fetching attendance' });
  }
};


export { createAttendance, getAllAttendance, getAttendanceById, updateAttendanceById,getAttendanceByStudentId };
