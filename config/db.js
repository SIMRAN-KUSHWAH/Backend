import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to MongoDB Database!`);
  } catch (error) {
    console.log(`error in MongoDB ${error}`);
  }
};

export default ConnectDB;
