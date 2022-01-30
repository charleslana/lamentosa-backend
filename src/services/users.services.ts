import AppError from '../shared/app.error';
import User from '../types/user.type';
import UserModel from '../models/user.model';

class UsersServices {
  public async createOne(user: User): Promise<User> {
    const userModel = new UserModel();
    const emailExists = await userModel.findByEmail(user.email);
    if (emailExists) {
      throw new AppError('Email already exists');
    }
    const userNameExists = await userModel.findByUserName(user.userName);
    if (userNameExists) {
      throw new AppError('Username already exists');
    }
    return await userModel.createOne(user);
  }

  public async deleteOne(id: string): Promise<User> {
    const userModel = new UserModel();
    const idExists = await userModel.findById(id);
    if (!idExists) {
      throw new AppError('User id not found');
    }
    return await userModel.deleteOne(id);
  }

  public async getAll(): Promise<User[]> {
    const userModel = new UserModel();
    return await userModel.getAll();
  }

  public async getOne(id: string): Promise<User> {
    const userModel = new UserModel();
    const idExists = await userModel.findById(id);
    if (!idExists) {
      throw new AppError('User id not found');
    }
    return await userModel.getOne(id);
  }

  public async updateOne(user: User): Promise<User> {
    const userModel = new UserModel();
    const idExists = await userModel.findById(user.id as string);
    if (!idExists) {
      throw new AppError('User id not found');
    }
    const emailExists = await userModel.findByEmail(user.email);
    if (emailExists && emailExists.id !== user.id) {
      throw new AppError('Email already exists');
    }
    const userNameExists = await userModel.findByUserName(user.userName);
    if (userNameExists && userNameExists.id !== user.id) {
      throw new AppError('Username already exists');
    }
    return await userModel.updateOne(user);
  }
}

export default UsersServices;
