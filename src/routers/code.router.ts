import { Router as createRouter } from 'express';
import { CodeRepo } from '../repositories/code.repo.js';
import { CodeController } from '../controllers/code.controller.js';
import { UserRepo } from '../repositories/user.repo.js';

const codeRepo = new CodeRepo();
const userRepo = new UserRepo();
const controller = new CodeController(codeRepo, userRepo);

export const codeRouter = createRouter();

codeRouter.post('/', controller.createCode.bind(controller));
