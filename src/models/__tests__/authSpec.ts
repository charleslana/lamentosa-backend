import BreedEnum from '../../enum/breed.enum';
import db from '../../database';
import GenderEnum from '../../enum/gender.enum';
import User from '../../types/user.type';
import UserModel from '../user.model';

const userModel = new UserModel();

describe('Authentication Module', () => {
  describe('Test methods exists', () => {
    it('should have an Authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('Test Authentication Logic', () => {
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

    it('Authenticate method should return the authenticated user', async () => {
      const authenticatedUser = await userModel.authenticate(
        user.email,
        user.password as string
      );

      expect(authenticatedUser?.email).toBe(user.email);
      expect(authenticatedUser?.name).toBe(user.name);
      expect(authenticatedUser?.gender).toBe(user.gender);
      expect(authenticatedUser?.breed).toBe(user.breed);
    });

    it('Authenticate method should return undefined for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticate(
        'test@no.exist',
        'fake-password'
      );

      expect(authenticatedUser).toBe(undefined);
    });
  });
});
