import { Schema, model } from 'mongoose';
import { Like } from '../entities/like.js';

const likeSchema = new Schema<Like>({
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  target: { type: Schema.Types.ObjectId, ref: 'Post' },
});

export const LikeModel = model('Like', likeSchema, 'likes');
