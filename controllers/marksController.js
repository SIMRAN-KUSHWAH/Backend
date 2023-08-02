import Marks from '../models/marksModel.js'; // Adjust the path based on your project structure
import Student from '../models/studentModel.js'; // Import the Student model


// POST - Create new marks for a student
export const addMarks = async (req, res) => {
  try {
    const marksData = req.body.marksData; // Assuming the client sends the data as { marksData: [...] }

    // Validate marksData to ensure it is not empty and has the required fields
    if (!Array.isArray(marksData) || marksData.length === 0) {
      return res.status(400).json({ error: 'Marks data is empty or invalid.' });
    }

    // Save each entry in the marksData array as a new document in the "Marks" collection
    const savedMarks = await Marks.create(marksData);

    res.status(201).json({ message: 'Marks submitted successfully!', data: savedMarks });
  } catch (error) {
    console.error('Error adding marks:', error);
    res.status(500).json({ error: 'Failed to add marks.' });
  }
};

// Assuming you have the necessary imports and setup for Mongoose and other modules

export const getAllMarks = async (req, res) => {
  try {
    // Fetch all marks from the database with student and subject information
    const marks = await Marks.find({})
      .populate('studentId') // Assuming the student name is stored in the "studentName" field of the student document
      // .populate('studentId', 'className');

    // If no marks found, return an empty array
    if (!marks || marks.length === 0) {
      return res.status(200).json([]);
    }

    // Format the result to include student names and subject names along with marks
    const formattedMarks = marks.map((mark) => ({
      studentId: mark.studentId._id, 
      studentName: mark.studentId.studentName,
      className: mark.studentId.className,
  subject : mark.subject,
      marks: mark.marksObtained,
    }));

    res.status(200).json(formattedMarks);
  } catch (error) {
    console.error('Error fetching all marks:', error);
    res.status(500).json({ error: 'Error fetching marks.' });
  }
};



// GET - Get marks for a student
export const getMarksByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
console.log(studentId)
    // Fetch marks by student ID from the database
    const marks = await Marks.find({ studentId }).populate('studentId');
    
    // If no marks found for the student, return an empty array
    if (!marks) {
      return res.status(200).json([]);
    }

    res.status(200).json(marks);
  } catch (error) {
    console.error('Error fetching marks by student ID:', error);
    res.status(500).json({ error: 'Error fetching marks.' });
  }
};


export const deleteMarks = async (req, res) => {
  try {
    const { studentId, subject } = req.params;

    // Delete the marks data for the student and subject
    await Marks.deleteOne({ studentId, subject });

    res.status(200).json({ message: 'Marks deleted successfully.' });
  } catch (error) {
    console.error('Error deleting marks:', error);
    res.status(500).json({ error: 'Failed to delete marks.' });
  }
};


export const updateMarks = async (req, res) => {
  try {
    const { studentId, subject, marksObtained } = req.body;

    // Check if the student with the given studentId exists in the "students" collection
    const existingStudent = await Student.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Find the marks data for the student and subject
    const existingMarks = await Marks.findOne({ studentId, subject });

    if (!existingMarks) {
      return res.status(404).json({ error: 'Student marks not found for the specified subject.' });
    }

    // Update the marks data for the student and subject
    existingMarks.marksObtained = marksObtained;
    await existingMarks.save();

    res.status(200).json({ message: 'Marks updated successfully.' });
  } catch (error) {
    console.error('Error updating marks:', error);
    res.status(500).json({ error: 'Failed to update marks.' });
  }
};
