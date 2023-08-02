import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    
    },
    studentName:{
      type: String,
    },
    fatherName:{
      type: String,
    },
    motherName:{
      type: String,
    },
    className:{
      type: String,
    },
    age:{
      type: String,
    },
    gender:{
      type: String,
    },
    medium:{
      type: String,
    },
    admsnId:{
        type: String,
    
    },
    admsnDate:{
        type:Date
    },
    adhaarNumber:{
        type: String,
    },
    admsnFee:{
        type: String,
    },
    feeStatus:{
        type: String,
    },
    payMode:{
        type:String,
        default:"Cash On Addmission"
    }
  },
  { timestamps: true }
);

export default mongoose.model("students", studentSchema);
