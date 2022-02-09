import BreedEnum from '../../enum/breed.enum';
import db from '../../database';
import GenderEnum from '../../enum/gender.enum';
import RoleEnum from '../../enum/role.enum';
import User from '../../types/user.type';
import UserModel from '../user.model';

const userModel = new UserModel();

describe('User Model', () => {
  describe('Test methods exists', () => {
    it('should have an Get All Users method', () => {
      expect(userModel.getAll).toBeDefined();
    });

    it('should have a Get One User method', () => {
      expect(userModel.getOne).toBeDefined();
    });

    it('should have a Create User method', () => {
      expect(userModel.createOne).toBeDefined();
    });

    it('should have a Update User method', () => {
      expect(userModel.updateOne).toBeDefined();
    });

    it('should have a Delete User method', () => {
      expect(userModel.deleteOne).toBeDefined();
    });

    it('should have an Authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('Test User Model Logic', () => {
    const user = {
      email: 'test@test.com',
      password: 'test123',
      name: 'test',
      gender: GenderEnum.Male,
      breed: BreedEnum.Werewolf,
    } as User;

    beforeAll(async () => {
      const createdUser = await userModel.createOne(user);
      user.id = createdUser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      // if you are not using uuid, you need to add "ALTER SEQUENCE users_id_seq RESTART WITH 1;"
      const sql = 'DELETE FROM users;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should return a New User', async () => {
      const createdUser = await userModel.createOne({
        email: 'test_create@test.com',
        password: 'test123',
        name: 'test_create',
        gender: GenderEnum.Male,
        breed: BreedEnum.Werewolf,
      } as User);

      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'test_create@test.com',
        name: 'test_create',
        gender: GenderEnum.Male,
        breed: BreedEnum.Werewolf,
      });
    });

    it('Get All method should return All available users in DB', async () => {
      const users = await userModel.getAll();

      expect(users.length).toBe(2);
    });

    it('Get One method should return a test user when call with ID', async () => {
      const returnedUser = await userModel.getOne(user.id as string);

      expect(returnedUser.id).toBe(user.id);
      expect(returnedUser.email).toBe(user.email);
      expect(returnedUser.name).toBe(user.name);
      expect(returnedUser.gender).toBe(user.gender);
      expect(returnedUser.breed).toBe(user.breed);
    });

    it('Update One method should return a user with edited attributes', async () => {
      const updateUser = await userModel.updateOne({
        ...user,
        name: 'test_updated',
        gender: GenderEnum.Female,
        breed: BreedEnum.Vampire,
        role: RoleEnum.Admin,
      } as User);

      expect(updateUser.id).toBe(user.id);
      expect(updateUser.email).toBe(user.email);
      expect(updateUser.name).toBe('test_updated');
      expect(updateUser.gender).toBe(GenderEnum.Female);
      expect(updateUser.breed).toBe(BreedEnum.Vampire);
    });

    it('Delete One method should delete user from DB', async () => {
      const deletedUser = await userModel.deleteOne(user.id as string);

      expect(deletedUser.id).toBe(user.id);
    });
  });
});
