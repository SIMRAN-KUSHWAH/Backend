import Event from '../models/eventModel.js';

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;

    // Create a new event record
    const event = new Event({
      title,
      description,
      location,
      date,
    });

    // Save the event record to the database
    const savedEvent = await event.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    // Find all events
    const allEvents = await Event.find();

    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, location, date } = req.body;

    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Update the event properties
    event.title = title;
    event.description = description;
    event.location = location;
    event.date = date;

    // Save the updated event to the database
    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find the event by ID and delete it
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
