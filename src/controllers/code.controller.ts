import createDebug from 'debug';
import { CodeRepo } from '../repositories/code.repo.js';
import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repositories/user.repo.js';

const debug = createDebug('SOCIALNETWORK:CODECONTROLLER');

export class CodeController {
  constructor(protected codeRepo: CodeRepo, protected userRepo: UserRepo) {
    debug('Instantiated');
    this.codeRepo = codeRepo;
    this.userRepo = userRepo;
  }

  async createCode(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userRepo.search({
        key: 'email',
        value: req.body.email,
      });

      if (!data.length) throw new Error('400 Bad Request');

      const response = {
        user: data[0],
      };

      const userCode = await this.codeRepo.create(response);
      res.send(userCode);
    } catch (error) {
      next(error);
    }
  }
}
