import { Schema, model } from 'mongoose';
import { FriendRequest } from '../entities/friend.request.js';

const friendRequestSchema = new Schema<FriendRequest>({
  sender: { type: Schema.Types.ObjectId, ref: 'Profile' },
  receiver: { type: Schema.Types.ObjectId, ref: 'Profile' },
  status: { type: String },
});

export const FriendRequestModel = model(
  'FriendRequest',
  friendRequestSchema,
  'friendRequests'
);
