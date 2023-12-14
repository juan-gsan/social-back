/* eslint-disable no-useless-constructor */
import { NextFunction, Request, Response } from 'express';
import { CodeRepo } from '../repositories/code.repo.js';
// Import { AuthServices } from '../services/auth.js';
export class AuthInterceptor {
  // eslint-disable-next-line no-unused-vars
  constructor(protected codeRepo: CodeRepo) {}

  async authorizedChangePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const codeData = await this.codeRepo.search({
        key: '_id',
        value: req.params.id,
      });

      if (!codeData) throw new Error('404 Invalid User');

      next();
    } catch (error) {
      next(error);
    }
  }
}
