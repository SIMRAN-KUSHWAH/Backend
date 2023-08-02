import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isUser: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String, // Change the type to String
    default: () => {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
