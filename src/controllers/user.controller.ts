import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repositories/user.repo';

export class UserController {
  constructor(protected userRepo: UserRepo) {
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
      const newItem = await this.userRepo.create(req.body);
      res.status(201);
      res.send(newItem);
    } catch (error) {
      next(error);
    }
  }
}
