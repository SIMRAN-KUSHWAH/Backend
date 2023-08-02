import mongoose from "mongoose";
import Exam from "../models/ExamModel.js"; // Assuming the model file is named teacher.js and located in the models directory
// Create a new teacher
export const createExamT = async (req, res) => {
    try {
      const examData = req.body; // Assuming you will send the teacher data in the request body
  
      const newExam = await Exam.create(examData);
  
      res.status(201).json(newExam);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get all teachers
  export const getAllExamT = async (req, res) => {
    try {
      const exams = await Exam.find();
  
      res.status(200).json(exams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  // Update an exam
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const examData = req.body;

    const updatedExam = await Exam.findByIdAndUpdate(id, examData, {
      new: true,
    });

    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.status(200).json(updatedExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an exam
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExam = await Exam.findByIdAndRemove(id);

    if (!deletedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  export default { createExamT, getAllExamT, updateExam, deleteExam };