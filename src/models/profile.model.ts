import { Schema, model } from 'mongoose';
import { Profile } from '../entities/profile.js';

const profileSchema = new Schema<Profile>({
  userName: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  avatar: {
    type: {
      urlOriginal: { type: String },
      url: { type: String },
      mimetype: { type: String },
      size: { type: Number },
    },
  },
  backgroundImage: {
    type: {
      urlOriginal: { type: String },
      url: { type: String },
      mimetype: { type: String },
      size: { type: Number },
    },
  },
  location: { type: String },
  birthdate: { type: Date },
  birthplace: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export const ProfileModel = model('Profile', profileSchema, 'profiles');
