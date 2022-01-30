import UserModel from '../models/user.model';
import { NextFunction, Request, Response } from 'express';

const userModel = new UserModel();

export const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(request.body);
    return response.json({
      status: 'success',
      data: { ...user },
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};
