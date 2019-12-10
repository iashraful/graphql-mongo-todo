import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const task = mongoose.model('task', taskSchema);

export default task;