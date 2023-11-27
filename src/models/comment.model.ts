import { Schema, model } from 'mongoose';
import { Comment } from '../entities/comment.js';

const commentSchema = new Schema<Comment>({
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  target: { type: Schema.Types.ObjectId, ref: 'Post' },
  textContent: { type: String },
  photo: {
    type: {
      urlOriginal: { type: String },
      url: { type: String },
      mimetype: { type: String },
      size: { type: Number },
    },
  },
  date: { type: Date },
});

export const CommentModel = model('Comment', commentSchema, 'comments');
