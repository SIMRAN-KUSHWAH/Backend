import mongoose from "mongoose";
import Notice from "../models/noticeModel.js";

// Create a new Notice
export const createNotice = async (req, res) => {
  try {
    const noticeData = req.body;

    const newNotice = await Notice.create(noticeData);

    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Notice
export const getAllNotice = async (req, res) => {
  try {
    const notices = await Notice.find();

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Notice
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNotice = await Notice.findByIdAndRemove(id);

    if (!deletedNotice) {
      throw new Error('Notice not found');
    }

    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Notice
export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const noticeData = req.body;

    const updatedNotice = await Notice.findByIdAndUpdate(id, noticeData, {
      new: true,
    });

    if (!updatedNotice) {
      throw new Error('Notice not found');
    }

    res.status(200).json(updatedNotice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createNotice,
  getAllNotice,
  deleteNotice,
  updateNotice,
};
