import express from 'express';
import Student from '../models/studentModel.js';

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const studentData = req.body; // Assuming you will send the student data in the request body

    const newStudent = await Student.create(studentData);

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller functions
const getClassList = async (req, res) => {
  try {
    const classes = await Student.distinct('className');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentsByClass = async (req, res) => {
  const { className } = req.params;
  try {
    const students = await Student.find({ className: className });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update the fee status of a student
export const updateFeeStatus = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { feeStatus } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { feeStatus },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Update a student
const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const updatedData = req.body;

  try {
    const student = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get teacher data by userId
const getStudentData = async (req, res) => {
  try {
    const { userId } = req.params;
    const studentData = await Student.findOne({ userId });
    if (!studentData) {
      return res.status(404).json({ message: 'Student data not found for the user' });
    }
    res.status(200).json(studentData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {  getStudentData, createStudent, getAllStudents, updateFeeStatus, deleteStudent, updateStudent, getClassList, getStudentsByClass, getStudentById};
