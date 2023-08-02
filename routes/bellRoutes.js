import express from "express";
import { addBellController, getBellController, deleteBellController } from "../controllers/bellController.js";


// Object Router
const router = express.Router();

// add notificiation
router.post("/add-bell", addBellController);

// get notification
router.get("/get-bell", getBellController);

// delete norification
router.delete("/delete-bell/:id", deleteBellController);


export default router;
