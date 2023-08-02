import Notes from '../models/notesModel.js';
import fs from 'fs';
import mimeTypes from 'mime-types';

export const createNote = async (req, res) => {
  try {
    const { teacher, Class, subject } = req.body;

    // Check if a file was uploaded
    if (!req.files || !req.files.notes) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    // Use mimeTypes library to detect file type
    // const fileBuffer = fs.readFileSync(req.files.notes.tempFilePath);
    const detectedMimeType = mimeTypes.lookup(req.files.notes.name);
    const allowedMimetypes = ['application/pdf', 'image/png', 'image/jpeg'];
    if (!detectedMimeType || !allowedMimetypes.includes(detectedMimeType)) {
      return res.status(400).json({ error: 'Please upload a PDF or image file' });
    }

    // console.log('Temporary file path:', req.files.notes.tempFilePath);


    // Create a new note record
    const note = new Notes({
      teacher,
      class: Class,
      subject,
      notes: req.files.notes.name, // Store the temporary file path in the database
    });

    // Save the note record to the database
    const savedNote = await note.save();

    // Move the uploaded file from the temporary location to a permanent location
    const sourcePath = req.files.notes.tempFilePath;
    const destinationPath = './uploads/' + req.files.notes.name;

    // Make sure the destinationPath is not empty
    if (!destinationPath) {
      return res.status(500).json({ error: 'Failed to create a valid destination path for the file' });
    }
 

    // const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);

    // readStream.on('error', (error) => {
    //   console.error('Failed to read the file:', error);
    //   res.status(500).json({ error: 'Failed to read the file' });
    // });

    writeStream.on('error', (error) => {
      console.error('Failed to save the file:', error);
      res.status(500).json({ error: 'Failed to save the file' });
    });

    writeStream.on('finish', () => {
      console.log('File saved successfully:', destinationPath);
      // Now you can save the 'destinationPath' to the database or use it as needed
      res.status(201).json(savedNote);
    });

    // readStream.pipe(writeStream);

  } catch (error) {
    console.error('Failed to create note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
};



export const getAllNotes = async (req, res) => {
  try {
    // Fetch all notes from the database
    const allNotes = await Notes.find({});

    // Check if there are any notes
    if (!allNotes || allNotes.length === 0) {
      return res.status(404).json({ error: 'No notes found' });
    }

    // Return the notes as a response
    res.status(200).json(allNotes);
  } catch (error) {
    console.error('Failed to get notes:', error);
    res.status(500).json({ error: 'Failed to get notes' });
  }
};


export const downloadNote = async (req, res) => {
  try {
    // Fetch the note by ID from the database
    const noteId = req.params.id;
    const note = await Notes.findById(noteId);

    // Check if the note exists
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const { notes } = note;

    // Generate the file path for download
    const downloadPath = './uploads/' + notes;

    // Check if the file exists
    if (!fs.existsSync(downloadPath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set the appropriate headers for file download
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${notes}"`);

    // Create a read stream to read the file
    const readStream = fs.createReadStream(downloadPath);

    // Pipe the read stream to the response object
    readStream.pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download note. Please try again.' });
  }
};