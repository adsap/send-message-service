import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResponseHelper } from '../helpers/response.helper';
import { SUCCESS_MESSAGES } from '../constants/response.constant';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = await this.userService.createUser(req.body);
      ResponseHelper.success(
        res,
        SUCCESS_MESSAGES.USER_CREATED,
        { id: userId },
        201,
      );
    } catch (err) {
      next(err);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = Number(req.params.id);
      await this.userService.updateUser(userId, req.body);
      ResponseHelper.success(res, SUCCESS_MESSAGES.USER_UPDATED, {
        id: userId,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = Number(req.params.id);
      await this.userService.deleteUser(userId);
      ResponseHelper.success(res, SUCCESS_MESSAGES.USER_DELETED, {
        id: userId,
      });
    } catch (err) {
      next(err);
    }
  }
}
