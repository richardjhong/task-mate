import mongoose, { Schema, Document } from 'mongoose';

interface UserInterface extends Document {
  firstName: string;
  lastName: string;
};

const userSchema = new Schema<UserInterface>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

export default 
  (mongoose.models.User as mongoose.Model<UserInterface>) || 
  mongoose.model<UserInterface>('User', userSchema)
  
