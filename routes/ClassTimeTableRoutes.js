import express from "express";
import {createTimetableEntry,getAllTimetableEntries, updateTimetableEntry} from "../controllers/classTimeTableController.js";

const router = express.Router();

// Create a new teacher
router.post("/class",createTimetableEntry);

// Get all teachers
router.get("/class/get",getAllTimetableEntries);


router.put('/class/:id', updateTimetableEntry);
// router.delete('/class/:id', classTimeTableController.deleteExam);

export default router;
