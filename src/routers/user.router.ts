import { UserController } from '../controllers/user.controller';
import { UserRepo } from '../repositories/user.repo';
import { Router as createRouter } from 'express';

const repo = new UserRepo();
const controller = new UserController(repo);

export const userRouter = createRouter();

userRouter.get('/', controller.getAll.bind(controller));
userRouter.get('/:id', controller.getById.bind(controller));
userRouter.post('/', controller.signUp.bind(controller));
