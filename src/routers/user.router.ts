import { UserController } from '../controllers/user.controller.js';
import { AuthInterceptor } from '../middlewares/auth.interceptor.js';
import { CodeRepo } from '../repositories/code.repo.js';
import { UserRepo } from '../repositories/user.repo.js';
import { Router as createRouter } from 'express';

const repo = new UserRepo();
const codeRepo = new CodeRepo();
const controller = new UserController(repo, codeRepo);
const authInterceptor = new AuthInterceptor(codeRepo);
export const userRouter = createRouter();

userRouter.get('/', controller.getAll.bind(controller));
userRouter.get('/:id', controller.getById.bind(controller));
userRouter.post('/', controller.signUp.bind(controller));
userRouter.patch('/', controller.logIn.bind(controller));
userRouter.patch(
  '/:id',
  authInterceptor.authorizedChangePassword.bind(authInterceptor),
  controller.changePassword.bind(controller)
);
