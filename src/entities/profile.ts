import { Image } from '../types/image.js';
import { Comment } from './comment.js';
import { Like } from './like.js';
import { Page } from './page.js';
import { Post } from './post.js';
import { User } from './user.js';

export interface Profile {
  id: string;
  owner: User;
  userName: string;
  avatar: Image;
  backgroundImage: Image;
  location: string;
  birthdate: Date;
  birthplace: string;
  photos: Image[];
  friends: Profile[];
  posts: Post[];
  likes: Like[];
  pages: Page[];
  comments: Comment[];
}
