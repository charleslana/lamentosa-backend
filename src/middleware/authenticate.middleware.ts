import AppError from '../shared/app.error';
import config from '../config';
import DecodeType from '../types/decode.type';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const handleUnauthorizedError = (next: NextFunction) => {
  const error: AppError = new AppError('Login Error: Please try again', 401);
  next(error);
};

const authenticateMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    const authHeader = request.get('Authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, config.tokenSecret as string);
        if (decode) {
          const { user } = decode as DecodeType;
          request.user = {
            id: user.id as string,
          };
          return next();
        }
        return handleUnauthorizedError(next);
      }
      return handleUnauthorizedError(next);
    }
    return handleUnauthorizedError(next);
  } catch (error) {
    handleUnauthorizedError(next);
  }
};

export default authenticateMiddleware;
