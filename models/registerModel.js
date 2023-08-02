import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
        type: String,
        required: true,
        trim: true,
      },
    number: {
      type: String,
      reuired: true,
      trim: true,
    },
    email: {
      type: String,
     
    },
    password: {
      type: String,
      reuired: true,
    },
    class: {
      type: String,
    },
  
  },
  { timestamps: true }
);

export default mongoose.model("register", userSchema);