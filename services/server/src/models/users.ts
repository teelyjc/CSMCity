import { Schema, model } from 'mongoose';

export interface UserData {
  username: string;
  password: string;
  email: string;
  salt: string;
  _id: string;
}

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  salt: String,
}, {
  timestamps: true,
  _id: true,
});

export const UserModel = model('User', UserSchema);