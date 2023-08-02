import Message from '../models/doutsModel.js';

// POST API to create a new message
export const createMessage = async (req, res) => {
  try {
    const { text, isUser } = req.body;

    // Create a new message document
    const newMessage = new Message({ text, isUser });

    // Save the new message to the database
    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
};

// GET API to get all messages
export const getAllMessages = async (req, res) => {
  try {
    // Fetch all messages from the database
    const allMessages = await Message.find({});

    res.status(200).json(allMessages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ error: 'Failed to get messages' });
  }
};
