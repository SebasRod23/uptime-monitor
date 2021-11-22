import mongoose, { Document, Schema } from 'mongoose';

export interface iUser extends Document {
  email: string;
  username: string;
  password: string;
}

const userSchema = new Schema<iUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
