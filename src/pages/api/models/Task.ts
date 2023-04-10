import mongoose, { Schema, Document } from 'mongoose';

interface TaskInterface extends Document {
  title: string;
  status: string;
};

const taskSchema = new Schema<TaskInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true
    }
  }
);

export default 
  (mongoose.models.Task as mongoose.Model<TaskInterface>) ||
  mongoose.model<TaskInterface>('Task', taskSchema);