import AppError from '../shared/app.error';
import RoleEnum from '../enum/role.enum';
import User from '../types/user.type';
import UserModel from '../models/user.model';

class UserService {
  public async authenticate(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const userModel = new UserModel();
    return await userModel.authenticate(email, password);
  }

  public async createOne(user: User): Promise<User> {
    const userModel = new UserModel();
    const emailExists = await userModel.findByEmail(user.email);
    if (emailExists) {
      throw new AppError('Email already exists');
    }
    const userNameExists = await userModel.findByName(user.name);
    if (userNameExists) {
      throw new AppError('Username already exists');
    }
    return await userModel.createOne(user);
  }

  public async deleteOne(id: string, role: RoleEnum): Promise<User> {
    if (role !== RoleEnum.Admin) {
      throw new AppError('Unauthorized', 401);
    }
    const userModel = new UserModel();
    const idExists = await userModel.findById(id);
    if (!idExists) {
      throw new AppError('User id not found');
    }
    return await userModel.deleteOne(id);
  }

  public async getAll(role: RoleEnum): Promise<User[]> {
    if (role !== RoleEnum.Admin) {
      throw new AppError('Unauthorized', 401);
    }
    const userModel = new UserModel();
    return await userModel.getAll();
  }

  public async getOne(id: string, role: RoleEnum): Promise<User> {
    if (role !== RoleEnum.Admin) {
      throw new AppError('Unauthorized', 401);
    }
    const userModel = new UserModel();
    const idExists = await userModel.findById(id);
    if (!idExists) {
      throw new AppError('User id not found');
    }
    return await userModel.getOne(id);
  }

  public async show(id: string): Promise<User> {
    const userModel = new UserModel();
    const idExists = await userModel.findById(id);
    if (!idExists) {
      throw new AppError('User id not found');
    }
    return await userModel.getOne(id);
  }

  public async updateOne(user: User, role: RoleEnum): Promise<User> {
    if (role !== RoleEnum.Admin) {
      throw new AppError('Unauthorized', 401);
    }
    const userModel = new UserModel();
    const idExists = await userModel.findById(user.id as string);
    if (!idExists) {
      throw new AppError('User id not found');
    }
    const emailExists = await userModel.findByEmail(user.email);
    if (emailExists && emailExists.id !== user.id) {
      throw new AppError('Email already exists');
    }
    const userNameExists = await userModel.findByName(user.name);
    if (userNameExists && userNameExists.id !== user.id) {
      throw new AppError('Username already exists');
    }
    return await userModel.updateOne(user);
  }
}

export default UserService;
