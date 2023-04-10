import mongoose, { Schema, Types } from 'mongoose';

enum TaskStatus {
  active = 'active',
  completed = 'completed',
}

interface TaskInterface {
  id: Types.ObjectId,
  title: string;
  status: TaskStatus;
};

const taskSchema = new Schema<TaskInterface>(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TaskStatus)
    }
  }
);

export default (mongoose.models.Task as mongoose.Model<TaskInterface>) || mongoose.model<TaskInterface>('Task', taskSchema);