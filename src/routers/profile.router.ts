import { ProfileController } from '../controllers/profile.controller.js';
import { ProfileRepo } from '../repositories/profile.repo.js';
import { Router as createRouter } from 'express';
import { UserRepo } from '../repositories/user.repo.js';
import { AuthInterceptor } from '../middlewares/auth.interceptor.js';
import { CodeRepo } from '../repositories/code.repo.js';

const profileRepo = new ProfileRepo();
const userRepo = new UserRepo();
const codeRepo = new CodeRepo();
const controller = new ProfileController(profileRepo, userRepo);
const interceptor = new AuthInterceptor(codeRepo, userRepo, profileRepo);

export const profileRouter = createRouter();

profileRouter.get('/', controller.getAll.bind(controller));
profileRouter.get('/:id', controller.getById.bind(controller));
profileRouter.post(
  '/',
  interceptor.logged.bind(interceptor),
  interceptor.authorizedForCreateProfile.bind(interceptor),
  controller.create.bind(controller)
);
profileRouter.patch(
  '/:id',
  interceptor.logged.bind(interceptor),
  interceptor.authorizedForProfile.bind(interceptor),
  controller.updateById.bind(controller)
);
profileRouter.delete(
  '/:id',
  interceptor.logged.bind(interceptor),
  interceptor.authorizedForProfile.bind(interceptor),
  controller.deleteById.bind(controller)
);
