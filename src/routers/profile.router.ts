import { ProfileController } from '../controllers/profile.controller.js';
import { ProfileRepo } from '../repositories/profile.repo.js';
import { Router as createRouter } from 'express';

const repo = new ProfileRepo();
const controller = new ProfileController(repo);

export const profileRouter = createRouter();

profileRouter.get('/', controller.getAll.bind(controller));
profileRouter.get('/:id', controller.getById.bind(controller));
profileRouter.post('/', controller.signUp.bind(controller));
