import express from 'express';
import { createAttendance, getAllAttendance,getAttendanceByStudentId, getAttendanceById, updateAttendanceById } from '../controllers/attendenceController.js';

// Create a new router
const router = express.Router();

// POST - Create a new attendance entry
router.post('/attendance', createAttendance);

// GET - Get all attendance entries
router.get('/attendance/get', getAllAttendance);


// Route for getting attendance entries by student ID
router.get('/attendance/students/:studentId', getAttendanceByStudentId);

// Route for getting a single attendance entry by ID
router.get('/attendance/:id', getAttendanceById);

// Route for updating a single attendance entry by ID
router.put('/attendance/:id', updateAttendanceById);
// Export the router
export default router;
