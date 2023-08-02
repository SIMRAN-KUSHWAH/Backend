import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      reuired: true,
      trim: true,
    },
    email: {
      type: String,
      reuired: true,
      unique: true,
    },
    password: {
      type: String,
      reuired: true,
    },
    type: {
      type: String,
    },
  
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
