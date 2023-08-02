import express from "express";
import studentController from "../controllers/studentController.js";
const router = express.Router();
// Create a new teacher
router.post("/student", studentController.createStudent);
router.get("/student/:userId", studentController.getStudentData);
// Get all teachers
router.get("/student/get", studentController.getAllStudents);


router.put("/student/fess/:studentId",studentController.updateFeeStatus);

router.put("/student/:studentId", studentController.updateStudent);

router.delete("/student/:studentId",studentController.deleteStudent);
router.get('/classes', studentController.getClassList);
router.get('/student/:studentId', studentController.getStudentById);
// Get students by class
router.get('/students/:className', studentController.getStudentsByClass);
export default router;
