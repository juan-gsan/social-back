import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { ProfileRepo } from '../repositories/profile.repo.js';

const debug = createDebug('SOCIALNETWORK:PROFILECONTROLLER');
export class ProfileController {
  constructor(protected profileRepo: ProfileRepo) {
    debug('Instantiated');
    this.profileRepo = profileRepo;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await this.profileRepo.query();
      res.status(200);
      res.send(items);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.profileRepo.queryById(req.params.id);
      res.status(200);
      res.send(item);
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const newItem = await this.profileRepo.create(req.body);
      res.status(201);
      res.send(newItem);
    } catch (error) {
      next(error);
    }
  }
}
