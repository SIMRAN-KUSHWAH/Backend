import mongoose from 'mongoose';

const submitFeeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    required: true,
  },
  feeAmount: {
    type: Number,
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

const SubmitFee = mongoose.model('SubmitFee', submitFeeSchema);

export default SubmitFee;