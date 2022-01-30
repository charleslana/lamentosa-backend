import AppSuccess from '../shared/app.success';
import UsersServices from '../services/users.services';
import { NextFunction, Request, Response } from 'express';

const usersServices = new UsersServices();

export const createOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await usersServices.createOne(request.body);
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
    const user = await usersServices.deleteOne(request.params.id as string);
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
    const users = await usersServices.getAll();
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
    const user = await usersServices.getOne(request.params.id as string);
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
    const user = await usersServices.updateOne(request.body);
    return response.json(new AppSuccess('User updated successfully', user));
  } catch (error) {
    next(error);
  }
};
