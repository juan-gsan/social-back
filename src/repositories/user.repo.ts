import { User } from '../entities/user';
import { UserModel } from '../models/user.model';

export class UserRepo {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

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
