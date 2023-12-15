import { User } from './user.js';

export interface Code {
  id: string;
  user: User;
  createdAt: Date;
}
