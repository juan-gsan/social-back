import { Image } from '../types/image.js';
import { Comment } from './comment.js';
import { Like } from './like.js';
import { Page } from './page.js';
import { Profile } from './profile.js';

export interface Post {
  id: string;
  owner: Profile | Page;
  textContent: string;
  photo: Image;
  date: Date;
  likes: Like[];
  comments: Comment[];
}
