

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
       order: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
  },
  { timestamps: true }
);

export default mongoose.model("notice", userSchema);