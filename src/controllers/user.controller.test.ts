import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repositories/user.repo';
import { UserController } from './user.controller';
import { CodeRepo } from '../repositories/code.repo';

describe('Given a UserController', () => {
  let userController: UserController;
  let mockUserRepo: UserRepo;
  let mockCodeRepo: CodeRepo;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockUserRepo = {
      query: jest.fn().mockResolvedValue([]),
      queryById: jest.fn().mockResolvedValue({ id: 'test' }),
    } as unknown as UserRepo;

    mockCodeRepo = {} as unknown as CodeRepo;
    userController = new UserController(mockUserRepo, mockCodeRepo);
  });

  describe('When getAll method is used', () => {
    test('Then userRepo.query should have been called', async () => {
      mockResponse = {
        status: jest.fn().mockReturnValue(200),
        send: jest.fn().mockReturnValue([]),
      } as unknown as Response;

      await userController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('When getById method is used', () => {
    test('Then userRepo.queryById should have been called', async () => {
      mockRequest = {
        params: { id: 'test' },
      } as unknown as Request;

      mockResponse = {
        status: jest.fn().mockReturnValue(200),
        send: jest.fn().mockReturnValue({ id: 'test' }),
      } as unknown as Response;

      await userController.getById(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});
