import { User } from '../entities/user.js';
import { UserModel } from '../models/user.model.js';
import createDebug from 'debug';

const debug = createDebug('SOCIALNETWORK:USERREPO');
export class UserRepo {
  constructor() {
    debug('Instantiated');
  }

  async query(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async queryById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (result === null) throw new Error('404 Not Found');
    return result;
  }

  async create(data: Partial<User>): Promise<User> {
    const newUser = await UserModel.create(data);
    return newUser;
  }
}
