import { RequestStatus } from '../types/request.status.js';
import { Profile } from './profile.js';

export interface FriendRequest {
  id: string;
  sender: Profile;
  receiver: Profile;
  status: RequestStatus;
}
