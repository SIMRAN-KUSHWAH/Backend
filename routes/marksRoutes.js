import express from 'express';
import { addMarks,deleteMarks, getAllMarks, updateMarks, getMarksByStudentId } from '../controllers/marksController.js';

// Create a new router
const router = express.Router();

// POST - Create new marks for a student
router.post('/marks', addMarks);

router.get('/get/marks', getAllMarks);

// Route for getting marks by student ID
router.get('/marks/students/:studentId', getMarksByStudentId);

router.put('/marks/:studentId/:subject', updateMarks);

// DELETE - Delete marks for a specific student and subject
router.delete('/marks/:studentId/:subject', deleteMarks);
// Export the router
export default router;

