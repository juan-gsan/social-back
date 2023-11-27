import { Schema, model } from 'mongoose';
import { User } from '../entities/user';

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

export const UserModel = model('User', userSchema, 'users');
