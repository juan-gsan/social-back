import { Schema, model } from 'mongoose';
import { Post } from '../entities/post.js';

const postSchema = new Schema<Post>({
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
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
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  comments: [],
});

export const PostModel = model('Post', postSchema, 'posts');
