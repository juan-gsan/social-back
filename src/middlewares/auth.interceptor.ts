import { NextFunction, Request, Response } from 'express';
import { CodeRepo } from '../repositories/code.repo.js';
import { UserRepo } from '../repositories/user.repo.js';
import { AuthServices, PayloadToken } from '../services/auth.js';
import { ProfileRepo } from '../repositories/profile.repo.js';
// Import { AuthServices } from '../services/auth.js';
export class AuthInterceptor {
  constructor(
    protected codeRepo: CodeRepo,
    protected userRepo: UserRepo,
    protected profileRepo: ProfileRepo
  ) {
    this.codeRepo = codeRepo;
    this.userRepo = userRepo;
    this.profileRepo = profileRepo;
  }

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

  logged(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader) {
        throw new Error('401 Not Authorized');
      }

      if (!authHeader.startsWith('Bearer')) {
        throw new Error('401 Not Authorized');
      }

      const token = authHeader.slice(7);
      const payload = AuthServices.verifyJWT(token);

      req.body.tokenPayload = payload;

      next();
    } catch (error) {
      next(error);
    }
  }

  async authorizedForCreateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.body.tokenPayload) throw new Error('498 Token not Found');

      const userProfile = await this.profileRepo.search({
        key: 'owner',
        value: req.body.tokenPayload.userId,
      });

      if (userProfile.length > 0) throw new Error('401 Not Authorized');

      next();
    } catch (error) {
      next(error);
    }
  }

  async authorizedForProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.tokenPayload) throw new Error('498 Token not Found');

      const { userId } = req.body.tokenPayload as PayloadToken;
      const { id } = req.params;

      const profile = await this.profileRepo.queryById(id);

      if (profile.owner.id !== userId) {
        throw new Error('401 Not Authorized');
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
