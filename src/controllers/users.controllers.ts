import UserModel from '../models/user.model';
import { NextFunction, Request, Response } from 'express';

const userModel = new UserModel();

export const createOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.createOne(request.body);
    return response.json({
      status: 'success',
      data: { ...user },
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getAll();
    return response.json({
      status: 'success',
      data: users,
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getOne(request.params.id as unknown as string);
    return response.json({
      status: 'success',
      data: user,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateOne(request.body);
    return response.json({
      status: 'success',
      data: user,
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteOne(
      request.params.id as unknown as string
    );
    return response.json({
      status: 'success',
      data: user,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
