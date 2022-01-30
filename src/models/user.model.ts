import db from '../database';
import User from '../types/user.type';

class UserModel {
  async create(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, password, user_name, gender_users, breed_users) values ($1, $2, $3, $4, $5) returning *`;
      const result = await connection.query(sql, [
        user.email,
        user.password,
        user.userName,
        user.gender,
        user.breed,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create (${user.userName}): ${(error as Error).message}`
      );
    }
  }
}

export default UserModel;
