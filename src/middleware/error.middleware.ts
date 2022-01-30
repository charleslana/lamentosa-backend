import Error from '../interfaces/error.interface';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Whoops!!! something went wrong';
  response.status(status).json({ status, message });
  next();
};

export default errorMiddleware;