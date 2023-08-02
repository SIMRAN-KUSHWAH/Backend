import SubmitFee from '../models/FessModal.js';

// Create a new fee submission
export const createFeeSubmission = async (req, res) => {
  try {
    const { studentId, feeAmount, Class } = req.body;

    // Create a new fee submission
    const newFeeSubmission = await SubmitFee.create({
      studentId,
      feeAmount,
      Class,
    });

    res.status(201).json(newFeeSubmission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all fee submissions
export const getAllFeeSubmissions = async (req, res) => {
  try {
    const feeSubmissions = await SubmitFee.find().populate('studentId');

    res.status(200).json(feeSubmissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
