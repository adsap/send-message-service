import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request.error';

export const validationMiddleware = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const errorMessages = errors.map((err) =>
        Object.values(err.constraints || {}).join(', '),
      );
      next(new BadRequestError(errorMessages.join(', ')));
      return;
    }

    next();
  };
};