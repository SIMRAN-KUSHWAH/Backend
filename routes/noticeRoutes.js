import express from "express";
import noticeController from "../controllers/noticeController.js";

const router = express.Router();

// Create a new notice
router.post("/notice", noticeController.createNotice);

// Get all notices
router.get("/notice/get", noticeController.getAllNotice);

// Update a notice
router.put("/notice/:id", noticeController.updateNotice);

// Delete a notice
router.delete("/notice/:id", noticeController.deleteNotice);

export default router;
