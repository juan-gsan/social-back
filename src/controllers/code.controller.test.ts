import { CodeRepo } from '../repositories/code.repo';
import { UserRepo } from '../repositories/user.repo';
import { CodeController } from './code.controller';
import { Request, Response, NextFunction } from 'express';
describe('Given a CodeController', () => {
  let codeController: CodeController;
  let mockUserRepo: UserRepo;
  let mockCodeRepo: CodeRepo;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockUserRepo = {
      search: jest.fn().mockResolvedValue([{ id: 'test', email: 'test' }]),
    } as unknown as UserRepo;
    mockCodeRepo = {
      create: jest.fn().mockResolvedValue({}),
    } as unknown as CodeRepo;
    codeController = new CodeController(mockCodeRepo, mockUserRepo);
    mockNext = jest.fn();
  });

  describe('When createCode is used', () => {
    test('Then res.send should have been called', async () => {
      mockRequest = {
        body: { email: 'test' },
      } as unknown as Request;
      mockResponse = {
        send: jest.fn(),
      } as unknown as Response;

      await codeController.createCode(mockRequest, mockResponse, mockNext);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});

describe('Given a CodeController', () => {
  let codeController: CodeController;
  let mockUserRepo: UserRepo;
  let mockCodeRepo: CodeRepo;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNext: NextFunction;
  let error: Error;
  beforeEach(() => {
    mockUserRepo = {
      search: jest.fn().mockResolvedValue([]),
    } as unknown as UserRepo;

    codeController = new CodeController(mockCodeRepo, mockUserRepo);
    mockNext = jest.fn();
  });

  describe('When createCode is used and data.length is null', () => {
    test('Then an error should be thrown', async () => {
      mockRequest = {
        body: { email: 'test' },
      } as unknown as Request;
      error = Error('400 Bad Request');
      await codeController.createCode(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
