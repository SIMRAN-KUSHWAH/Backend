import express from "express";
import {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
  } from "../controllers/eventController.js";
  

const router = express.Router();

// Create a new event
router.post("/event", createEvent);

// Get all events
router.get("/event/getAll", getAllEvents);

// Update an event
router.put("/event/:id", updateEvent);

// Delete an event
router.delete("/event/:id",deleteEvent);

export default router;
