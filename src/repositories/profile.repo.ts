import createDebug from 'debug';
import { Profile } from '../entities/profile.js';
import { ProfileModel } from '../models/profile.model.js';

const debug = createDebug('SOCIALNETWORK:PROFILEREPO');
export class ProfileRepo {
  constructor() {
    debug('Instantiated');
  }

  async query(): Promise<Profile[]> {
    const result = await ProfileModel.find().exec();
    return result;
  }

  async queryById(id: string): Promise<Profile> {
    const result = await ProfileModel.findById(id).exec();
    if (result === null) throw new Error('404 Not Found');
    return result;
  }

  async create(data: Partial<Profile>): Promise<Profile> {
    const newProfile = await ProfileModel.create(data);
    return newProfile;
  }
}
