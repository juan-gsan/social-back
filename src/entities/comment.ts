import { Image } from '../types/image.js';
import { Like } from './like.js';
import { Page } from './page.js';
import { Post } from './post.js';
import { Profile } from './profile.js';

export interface Comment {
  id: string;
  target: Post | Page | Profile | Comment;
  owner: Profile | Page;
  textContent: string;
  photo: Image;
  date: Date;
  likes: Like[];
}
