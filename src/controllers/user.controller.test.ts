import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repositories/user.repo';
import { UserController } from './user.controller';
import { CodeRepo } from '../repositories/code.repo';
import { AuthServices } from '../services/auth';

jest.mock('../services/auth');
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
      create: jest.fn().mockResolvedValue({ password: 'test' }),
      search: jest
        .fn()
        .mockResolvedValue([{ id: 'test', email: 'test', password: 'test' }]),
      update: jest.fn().mockResolvedValue({ id: 'test' }),
    } as unknown as UserRepo;
    mockCodeRepo = {
      search: jest
        .fn()
        .mockResolvedValue([{ _id: 'test', user: { id: 'test' } }]),
    } as unknown as CodeRepo;
    userController = new UserController(mockUserRepo, mockCodeRepo);
    mockNext = jest.fn();
  });

  describe('When getAll method is used', () => {
    test('Then res.send should have been called', async () => {
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
    test('Then res.send should have been called', async () => {
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
  describe('When signUp method is used', () => {
    test('Then res.send should have been called', async () => {
      mockRequest = {
        body: { password: 'test' },
      } as unknown as Request;
      mockResponse = {
        status: jest.fn().mockReturnValue(201),
        send: jest.fn().mockReturnValue({ password: 'test' }),
      } as unknown as Response;

      await userController.signUp(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
  describe('When logIn method is used', () => {
    test('Then res.send should have been called', async () => {
      mockRequest = {
        body: { id: 'test', email: 'test', password: 'test' },
      } as unknown as Request;
      mockResponse = {
        send: jest.fn(),
      } as unknown as Response;

      AuthServices.compare = jest.fn().mockResolvedValue(true);
      AuthServices.createJWT = jest.fn().mockReturnValue('test');
      await userController.logIn(mockRequest, mockResponse, mockNext);
      expect(mockUserRepo.search).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
  describe('When changePassword method is used', () => {
    test('Then res.send should have been called', async () => {
      mockRequest = {
        body: { id: 'test', password: 'test' },
        params: { id: 'test' },
      } as unknown as Request;
      mockResponse = {
        send: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;

      AuthServices.hash = jest.fn().mockResolvedValue('test');
      await userController.changePassword(mockRequest, mockResponse, mockNext);

      expect(mockCodeRepo.search).toHaveBeenCalled();
      expect(mockUserRepo.update).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});

describe('Given a UserController', () => {
  let userController: UserController;
  let mockUserRepo: UserRepo;
  let mockCodeRepo: CodeRepo;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNext: NextFunction;
  let error: Error;
  beforeEach(() => {
    mockUserRepo = {
      query: jest.fn().mockRejectedValue(error),
      queryById: jest.fn().mockRejectedValue(error),
      create: jest.fn().mockRejectedValue(error),
      search: jest.fn().mockRejectedValue(error),
      update: jest.fn().mockRejectedValue(error),
    } as unknown as UserRepo;
    mockCodeRepo = {
      search: jest.fn().mockRejectedValue(error),
    } as unknown as CodeRepo;
    userController = new UserController(mockUserRepo, mockCodeRepo);
    mockNext = jest.fn();
  });

  describe('When getAll method is used and there is no result', () => {
    test('Then next should have been called with error', async () => {
      error = Error();
      await userController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
  describe('When getById method is used and there is no result', () => {
    test('Then next should have been called with error', async () => {
      error = Error();
      await userController.getById(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
  describe('When signUp method is used and there is no result', () => {
    test('Then next should have been called with error', async () => {
      error = Error();
      await userController.signUp(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
  describe('When logIn method is used and there is no req.body', () => {
    test('Then next should have been called with error', async () => {
      mockRequest = { body: {} } as unknown as Request;
      error = Error('400 Bad Request');
      await userController.logIn(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  describe('When logIn method is used and there is no data.length', () => {
    test('Then next should have been called with error', async () => {
      mockRequest = {
        body: { email: 'test', password: 'test' },
      } as unknown as Request;
      error = Error('400 Bad Request');
      const mockUserRepoSearch = {
        search: jest.fn().mockResolvedValue([]),
      } as unknown as UserRepo;
      const userControllerLogin = new UserController(
        mockUserRepoSearch,
        mockCodeRepo
      );
      await userControllerLogin.logIn(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  describe('When logIn method is used and the password does not match', () => {
    test('Then next should have been called with error', async () => {
      mockRequest = {
        body: { email: 'test', password: 'test' },
      } as unknown as Request;
      error = Error('400 Bad Request');
      const mockUserRepoSearch = {
        search: jest
          .fn()
          .mockResolvedValue([{ id: 'test', email: 'test', password: 'test' }]),
      } as unknown as UserRepo;
      const userControllerLogin = new UserController(
        mockUserRepoSearch,
        mockCodeRepo
      );
      AuthServices.compare = jest.fn().mockResolvedValue(false);
      await userControllerLogin.logIn(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  describe('When logIn method is used and there is no result', () => {
    test('Then next should have been called with error', async () => {
      error = Error();
      await userController.logIn(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
  describe('When changePassword method is used and there is no userCode', () => {
    test('Then next should have been called with error', async () => {
      error = Error('404 Invalid User');
      mockRequest = {
        body: { id: 'test', password: 'test' },
        params: { id: 'test' },
      } as unknown as Request;

      const mockCodeRepoSearch = {
        search: jest.fn().mockResolvedValue(null),
      } as unknown as CodeRepo;
      const userControllerLogin = new UserController(
        mockUserRepo,
        mockCodeRepoSearch
      );
      AuthServices.hash = jest.fn().mockResolvedValue('test');
      await userControllerLogin.changePassword(
        mockRequest,
        mockResponse,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  describe('When changePassword method is used and there is no result', () => {
    test('Then next should have been called with error', async () => {
      error = Error();
      await userController.changePassword(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
