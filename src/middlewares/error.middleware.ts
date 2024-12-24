/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http.error';

const errorMiddleware = (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).json({
    status,
    message,
  });
};

export default errorMiddleware;
