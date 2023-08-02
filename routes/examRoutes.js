import express from "express";
import examController from "../controllers/ExamController.js";

const router = express.Router();

// Create a new teacher
router.post("/exam", examController.createExamT);

// Get all teachers
router.get("/exam/get", examController.getAllExamT);


router.put('/exam/:id', examController.updateExam);
router.delete('/exam/:id', examController.deleteExam);

export default router;
