import express from "express";
import { createFeeSubmission, getAllFeeSubmissions } from "../controllers/fessController.js";

const router = express.Router();

// Create a new fee submission
router.post("/fess", createFeeSubmission);

// Get all fee submissions
router.get("/fess/get", getAllFeeSubmissions);

export default router;
