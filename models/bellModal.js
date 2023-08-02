import mongoose from "mongoose";

const bellSchema = new mongoose.Schema({
  fromid: {
    type: String,
    require: true,
  },
  toid: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("bells", bellSchema);
