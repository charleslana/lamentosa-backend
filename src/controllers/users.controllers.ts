import AppSuccess from '../shared/app.success';
import UserService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';

const userService = new UserService();

export const createOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createOne(request.body);
    return response.json(new AppSuccess('User created successfully', user));
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
    const user = await userService.deleteOne(request.params.id as string);
    return response.json(new AppSuccess('User deleted successfully', user));
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
    const users = await userService.getAll();
    return response.json(new AppSuccess('Users retrieved successfully', users));
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
    const user = await userService.getOne(request.params.id as string);
    return response.json(new AppSuccess('User retrieved successfully', user));
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
    const user = await userService.updateOne(request.body);
    return response.json(new AppSuccess('User updated successfully', user));
  } catch (error) {
    next(error);
  }
};
