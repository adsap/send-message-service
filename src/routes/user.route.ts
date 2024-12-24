import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

class HomeRoutes {
  router = Router();
  userController = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post(
      '/',
      validationMiddleware(CreateUserDto),
      this.userController.createUser,
    );

    this.router.put(
      '/:id',
      validationMiddleware(UpdateUserDto),
      this.userController.updateUser,
    );

    this.router.delete('/:id', this.userController.deleteUser);
  }
}

export default new HomeRoutes().router;
