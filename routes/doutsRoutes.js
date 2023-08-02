import express from 'express';
import { createMessage, getAllMessages } from '../controllers/doutsController.js';

const router = express.Router();

// Route for creating a new message
router.post('/messages', createMessage);

// Route for getting all messages
router.get('/messages', getAllMessages);

export default router;
