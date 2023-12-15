import { ProfileController } from '../controllers/profile.controller.js';
import { ProfileRepo } from '../repositories/profile.repo.js';
import { Router as createRouter } from 'express';
import { UserRepo } from '../repositories/user.repo.js';

const profileRepo = new ProfileRepo();
const userRepo = new UserRepo();
const controller = new ProfileController(profileRepo, userRepo);

export const profileRouter = createRouter();

profileRouter.get('/', controller.getAll.bind(controller));
profileRouter.get('/:id', controller.getById.bind(controller));
profileRouter.post('/', controller.create.bind(controller));
profileRouter.patch('/:id', controller.updateById.bind(controller));
profileRouter.delete('/:id', controller.deleteById.bind(controller));
