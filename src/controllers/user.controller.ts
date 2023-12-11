import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repositories/user.repo.js';
import createDebug from 'debug';
import { AuthServices, PayloadToken } from '../services/auth.js';
import { LoginResponse } from '../types/login.response.js';

const debug = createDebug('SOCIALNETWORK:USERCONTROLLER');
export class UserController {
  constructor(protected userRepo: UserRepo) {
    debug('Instantiated');
    this.userRepo = userRepo;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await this.userRepo.query();
      res.status(200);
      res.send(items);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.userRepo.queryById(req.params.id);
      res.status(200);
      res.send(item);
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const password = await AuthServices.hash(req.body.password);
      req.body.password = password;
      const newItem = await this.userRepo.create(req.body);
      res.status(201);
      res.send(newItem);
    } catch (error) {
      next(error);
    }
  }

  async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.email || !req.body.password)
        throw new Error('400 Bad Request');

      const data = await this.userRepo.search({
        key: 'email',
        value: req.body.email,
      });

      if (!data.length) throw new Error('400 Bad Request');

      const checkPassword = await AuthServices.compare(
        req.body.password,
        data[0].password
      );

      if (!checkPassword) throw new Error('400 Bad Request');

      const payload: PayloadToken = {
        id: data[0].id,
        email: data[0].email,
      };

      const token = AuthServices.createJWT(payload);
      const response: LoginResponse = {
        token,
        userId: data[0].id,
      };

      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const newPassword = await AuthServices.hash(req.body.password);
      req.body.password = newPassword;
      const updatedUser = await this.userRepo.update(req.params.id, req.body);
      res.status(200);
      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}
