import express from 'express';
import { createAttendanceTeacher, updateAttendanceByTeacherId, getAttendenceByTeacher } from '../controllers/attendenceTeacherController.js'

// Create a new router
const router = express.Router();


// Route for creating AttendanceTeacher documents
router.post('/attendance/teacher', createAttendanceTeacher );
router.put('/attendance/teacher/:teacherId', updateAttendanceByTeacherId);
router.get('/attendance/teacher/:teacherId', getAttendenceByTeacher); // Get all attendance

export default router;
 