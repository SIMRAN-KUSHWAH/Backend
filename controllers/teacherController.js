import mongoose from "mongoose";
import Teacher from "../models/teacherModel.js";

// Create a new teacher
 const createTeacher = async (req, res) => {
  try {
    const teacherData = req.body;
    const newTeacher = await Teacher.create(teacherData);
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all teachers
 const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get teacher data by userId
 const getTeacherData = async (req, res) => {
  try {
    const { userId } = req.params;
    const teacherData = await Teacher.findOne({ userId });
    if (!teacherData) {
      return res.status(404).json({ message: 'Teacher data not found for the user' });
    }
    res.status(200).json(teacherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update teacher data
 const updateTeacher = async (req, res) => {
  const { teacherId } = req.params;
  try {
   
    const teacherData = req.body;
    const updatedTeacher = await Teacher.findOneAndUpdate(teacherId, teacherData, {
      new: true,
    });
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher data not found for the user' });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete teacher data
 const deleteTeacher = async (req, res) => {
  const { teacherId } = req.params;

  try {
  
    const deletedTeacher = await Teacher.findOneAndDelete(teacherId);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher data not found for the user' });
    }
    res.status(200).json({ message: 'Teacher data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default { createTeacher, deleteTeacher, updateTeacher, getTeacherData, getAllTeachers, getTeacherById};
