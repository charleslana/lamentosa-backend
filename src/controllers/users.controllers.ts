import AppError from '../shared/app.error';
import AppSuccess from '../shared/app.success';
import config from '../config';
import jwt from 'jsonwebtoken';
import RoleEnum from '../enum/role.enum';
import UserService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';

const userService = new UserService();

export const authenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;
    const user = await userService.authenticate(email, password);
    if (!user) {
      throw new AppError(
        'The email and password do not match please try again',
        401
      );
    }
    const token = jwt.sign({ user }, config.tokenSecret as string, {
      expiresIn: '1d',
    });
    return response.json(
      new AppSuccess('User authenticated successfully', { ...user, token })
    );
  } catch (error) {
    next(error);
  }
};

export const createOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createOne(request.body);
    return response
      .status(201)
      .json(new AppSuccess('User created successfully', user, 201));
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
    const user = await userService.deleteOne(
      request.params.id as string,
      request.user.role as unknown as RoleEnum
    );
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
    const users = await userService.getAll(
      request.user.role as unknown as RoleEnum
    );
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
    const user = await userService.getOne(
      request.params.id as string,
      request.user.role as unknown as RoleEnum
    );
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
    const user = await userService.updateOne(
      request.body,
      request.user.role as unknown as RoleEnum
    );
    return response.json(new AppSuccess('User updated successfully', user));
  } catch (error) {
    next(error);
  }
};
