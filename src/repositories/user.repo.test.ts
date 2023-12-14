import { UserModel } from '../models/user.model';
import { UserRepo } from './user.repo';

jest.mock('../models/user.model');
describe('Given a UserRepo', () => {
  let userRepo: UserRepo;

  beforeEach(() => {
    userRepo = new UserRepo();
  });

  describe('When query method is used', () => {
    test('Then UserModel.find should have been called', async () => {
      const exec = jest.fn().mockResolvedValueOnce([]);
      UserModel.find = jest.fn().mockReturnValueOnce({ exec });
      const result = await userRepo.query();
      expect(exec).toHaveBeenCalled();
      expect(result).toStrictEqual([]);
    });
  });

  describe('When queryById method is used', () => {
    test('Then UserModel.findById should have been called', async () => {
      const exec = jest.fn().mockResolvedValueOnce({});
      UserModel.findById = jest.fn().mockReturnValueOnce({ exec });
      const result = await userRepo.queryById('test');
      expect(exec).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });
  });

  describe('When create method is used', () => {
    test('Then UserModel.create should have been called', async () => {
      UserModel.create = jest.fn().mockResolvedValueOnce({});
      const newUser = await userRepo.create({});
      expect(UserModel.create).toHaveBeenCalled();
      expect(newUser).toStrictEqual({});
    });
  });

  describe('When search method is used', () => {
    test('Then UserModel.find should have been called', async () => {
      const exec = jest.fn().mockResolvedValueOnce([{ id: 'test' }]);
      UserModel.find = jest.fn().mockReturnValueOnce({ exec });
      const result = await userRepo.search({ key: 'id', value: 'test' });
      expect(exec).toHaveBeenCalled();
      expect(result).toStrictEqual([{ id: 'test' }]);
    });
  });

  describe('When update method is used', () => {
    test('Then UserModel.findByIdAndUpdate should have been called', async () => {
      const exec = jest
        .fn()
        .mockResolvedValueOnce({ id: 'test', email: 'test@test.com' });
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({ exec });
      const result = await userRepo.update('test', {
        id: 'test',
        email: 'test@test.com',
      });
      expect(exec).toHaveBeenCalled();
      expect(result).toStrictEqual({ id: 'test', email: 'test@test.com' });
    });
  });

  describe('When delete method is used', () => {
    test('Then UserModel.findByIdAndDelete should have been called', async () => {
      const exec = jest.fn();
      UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({ exec });
      const result = await userRepo.delete('test');
      expect(exec).toHaveBeenCalled();
      expect(result).not.toBeNull();
    });
  });
});
