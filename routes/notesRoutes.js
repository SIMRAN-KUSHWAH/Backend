import express from 'express';
import { createNote , getAllNotes, downloadNote} from '../controllers/notesController.js';

const router = express.Router();


// Create a new note
router.post('/notes/pdfAdd', createNote);


router.get('/notes', getAllNotes);
// Define other note routes here using the router object

router.get('/notes/:id/download', downloadNote);

export default router;
