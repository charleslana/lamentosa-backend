import app from '../../index';
import BreedEnum from '../../enum/breed.enum';
import db from '../../database';
import GenderEnum from '../../enum/gender.enum';
import RoleEnum from '../../enum/role.enum';
import supertest from 'supertest';
import User from '../../types/user.type';
import UserModel from '../../models/user.model';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('User API Endpoints', () => {
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
    await userModel.updateOne({ ...user, role: RoleEnum.Admin });
  });

  afterAll(async () => {
    const connection = await db.connect();
    // if you are not using uuid, you need to add "ALTER SEQUENCE users_id_seq RESTART WITH 1;"
    const sql = 'DELETE FROM users;';
    await connection.query(sql);
    connection.release();
  });

  describe('Test Authenticate methods', () => {
    it('should be able to authenticate to get token', async () => {
      const response = await request
        .post('/api/public/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'test123',
        });

      expect(response.status).toBe(200);

      const { id, email, token: userToken } = response.body.data;

      expect(id).toBe(user.id);
      expect(email).toBe(user.email);
      token = userToken;
    });

    it('should be failed to authenticate with wrong email', async () => {
      const response = await request
        .post('/api/public/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'wrong@test.com',
          password: 'test123',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('Test CRUD API methods', () => {
    it('should create new user', async () => {
      const response = await request
        .post('/api/public/users')
        .set('Content-type', 'application/json')
        .send({
          email: 'test_created@test.com',
          password: 'test123',
          name: 'test_created',
          gender: GenderEnum.Male,
          breed: BreedEnum.Werewolf,
        } as User);

      expect(response.status).toBe(201);

      const { email, name, gender, breed } = response.body.data;

      expect(email).toBe('test_created@test.com');
      expect(name).toBe('test_created');
      expect(gender).toBe(GenderEnum.Male);
      expect(breed).toBe(BreedEnum.Werewolf);
    });

    it('should get list of users', async () => {
      const response = await request
        .get('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
    });

    it('should get user info', async () => {
      const response = await request
        .get(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.email).toBe('test@test.com');
    });

    it('should get user details', async () => {
      const response = await request
        .get('/api/users/details')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.email).toBe('test@test.com');
    });

    it('should update user info', async () => {
      const response = await request
        .put('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          name: 'test_updated',
          gender: GenderEnum.Female,
          breed: BreedEnum.Vampire,
          role: RoleEnum.Admin,
        } as User);

      expect(response.status).toBe(200);

      const { id, email, name, gender, breed, role } = response.body.data;

      expect(id).toBe(user.id);
      expect(email).toBe(user.email);
      expect(name).toBe('test_updated');
      expect(gender).toBe(GenderEnum.Female);
      expect(breed).toBe(BreedEnum.Vampire);
      expect(role).toBe(RoleEnum.Admin);
    });

    it('should delete user', async () => {
      const response = await request
        .delete(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(user.id);
      expect(response.body.data.name).toBe('test_updated');
    });
  });
});
