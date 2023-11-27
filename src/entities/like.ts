import { Post } from './post.js';
import { Profile } from './profile.js';

export interface Like {
  id: string;
  target: Post;
  owner: Profile;
}
