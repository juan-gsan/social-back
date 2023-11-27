import { Comment } from './comment.js';
import { Page } from './page.js';
import { Post } from './post.js';
import { Profile } from './profile.js';

export interface Like {
  id: string;
  target: Post | Comment | Page;
  owner: Profile | Page;
}
