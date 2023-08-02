import express from "express";
import teacherController from "../controllers/teacherController.js";

const router = express.Router();

// Create a new teacher
router.post("/teacher", teacherController.createTeacher);

// Get all teachers
router.get("/teacher/get", teacherController.getAllTeachers);

// Get teacher-specific data
router.get("/teacher-data/:userId", teacherController.getTeacherData);

// Update teacher data
router.put("/teacher-data/:teacherId", teacherController.updateTeacher);

// Delete teacher data
router.delete("/teacher-data/:teacherId", teacherController.deleteTeacher);


router.get("/teacher/:teacherId", teacherController.getTeacherById);
export default router;
