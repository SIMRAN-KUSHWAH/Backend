import Timetable from '../models/classTimeTableModel.js';

// Create a new Time Table entry
export const createTimetableEntry = async (req, res) => {
  try {
    const { className, day, startTime, endTime, subject, teacher } = req.body;
    const newTimetableEntry = new Timetable({
      className,
      day,
      startTime,
      endTime,
      subject,
      teacher,
    });
    const savedEntry = await newTimetableEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error('Error creating Time Table entry:', error);
    res.status(500).json({ error: 'Failed to create Time Table entry' });
  }
};
// Get all Time Table entries
export const getAllTimetableEntries = async (req, res) => {
  try {
    const timetableEntries = await Timetable.find();
    res.status(200).json(timetableEntries);
  } catch (error) {
    console.error('Error fetching Time Table entries:', error);
    res.status(500).json({ error: 'Failed to fetch Time Table entries' });
  }
};

// Update a Time Table entry by ID
export const updateTimetableEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status} = req.body;
    const updatedEntry = await Timetable.findByIdAndUpdate(
      id,
      { status},
      { new: true } // Return the updated entry
    );
    if (!updatedEntry) {
      return res.status(404).json({ error: 'Time Table entry not found' });
    }
    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error('Error updating Time Table entry:', error);
    res.status(500).json({ error: 'Failed to update Time Table entry' });
  }
};

// Delete a Time Table entry by ID
export const deleteTimetableEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEntry = await Timetable.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ error: 'Time Table entry not found' });
    }
    res.status(200).json({ message: 'Time Table entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting Time Table entry:', error);
    res.status(500).json({ error: 'Failed to delete Time Table entry' });
  }
};
