import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { ProfileRepo } from '../repositories/profile.repo.js';
import { UserRepo } from '../repositories/user.repo.js';

const debug = createDebug('SOCIALNETWORK:PROFILECONTROLLER');
export class ProfileController {
  constructor(
    protected profileRepo: ProfileRepo,
    protected userRepo: UserRepo
  ) {
    debug('Instantiated');
    this.profileRepo = profileRepo;
    this.userRepo = userRepo;
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

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newProfile = await this.profileRepo.create(req.body);
      res.status(201);
      res.send(newProfile);
    } catch (error) {
      next(error);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedProfile = await this.profileRepo.update(
        req.params.id,
        req.body
      );
      res.status(200);
      res.send(updatedProfile);
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(204);
      res.send(await this.profileRepo.delete(req.params.id));
      res.send(await this.userRepo.delete(req.params.id));
    } catch (error) {
      next(error);
    }
  }
}
