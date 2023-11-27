import { Image } from '../types/image.js';
import { Comment } from './comment.js';
import { Like } from './like.js';
import { Post } from './post.js';
import { Profile } from './profile.js';
import { User } from './user.js';

export interface Page {
  id: string;
  admin: User;
  pageName: string;
  creator: Profile;
  owners: Profile[];
  avatar: Image;
  backgroundImage: Image;
  location: string;
  photos: Image[];
  followers: Profile[];
  posts: Post[];
  likes: Like[];
  comments: Comment[];
}
