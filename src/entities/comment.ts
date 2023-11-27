import { Image } from '../types/image.js';
import { Post } from './post.js';
import { Profile } from './profile.js';

export interface Comment {
  id: string;
  target: Post;
  owner: Profile;
  textContent: string;
  photo: Image;
  date: Date;
}
