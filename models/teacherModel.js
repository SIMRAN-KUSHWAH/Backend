import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name:{
      type: String,
    },
    fatherName:{
      type: String,
    },
    motherName:{
      type: String,
    },
    gender:{
        type: String,
    },
    age:{
        type: String,
    },
      qualification:{
      type: String,
  },
  experience:{
      type: String,
  },
    designation:{
      type: String,
    },
    JobId:{
        type: String,
    
    },
    JoinDate:{
        type:Date
    },
    adhaarNumber:{
        type: String,
    },
    Salary:{
        type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("teachers", teacherSchema);
