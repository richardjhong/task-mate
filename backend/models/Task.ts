import mongoose, { Schema, Types } from 'mongoose';

enum TaskStatus {
  Active = 'active',
  Completed = 'completed',
}

interface TaskInterface {
  title: string;
  status: TaskStatus;
};

const taskSchema = new Schema<TaskInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TaskStatus)
    }
  },
);

export default (mongoose.models.Task as mongoose.Model<TaskInterface>) || mongoose.model<TaskInterface>('Task', taskSchema);