import bcrypt from 'bcrypt';
import config from '../config';
import db from '../database';
import User from '../types/user.type';

const hasPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
  public async authenticate(
    email: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT password FROM users WHERE email = ($1)';
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, email, name, gender, breed, role FROM users WHERE email = ($1)',
            [email]
          );
          connection.release();
          return userInfo.rows[0];
        }
      }
      connection.release();
      return undefined;
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`);
    }
  }

  public async createOne(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, password, name, gender, breed)
      VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, gender, breed`;
      const result = await connection.query(sql, [
        user.email,
        hasPassword(user.password as string),
        user.name,
        user.gender,
        user.breed,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create (${user.name}): ${(error as Error).message}`
      );
    }
  }

  public async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql =
        'DELETE FROM users WHERE id=($1) RETURNING id, email, name, gender, breed';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete user ${id} ${(error as Error).message}`
      );
    }
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT id, email FROM users WHERE email = ($1)';
      const result = await connection.query(sql, [email]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not find email ${email}, ${(error as Error).message}`
      );
    }
  }

  public async findById(id: string): Promise<User | undefined> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT id FROM users WHERE id = ($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find id ${id}, ${(error as Error).message}`);
    }
  }

  public async findByName(name: string): Promise<User | undefined> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT id, name FROM users WHERE name = ($1)';
      const result = await connection.query(sql, [name]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not find username ${name}, ${(error as Error).message}`
      );
    }
  }

  public async getAll(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT id, email, name, gender, breed, role FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`);
    }
  }

  public async getOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql =
        'SELECT id, email, name, gender, breed, role FROM users WHERE id = ($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`);
    }
  }

  public async updateOne(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users SET email=$1, password=$2, name=$3, gender=$4, breed=$5, role=$6
      WHERE id=$7 RETURNING id, email, name, gender, breed, role`;
      const result = await connection.query(sql, [
        user.email,
        hasPassword(user.password as string),
        user.name,
        user.gender,
        user.breed,
        user.role,
        user.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update user: (${user.name}): ${(error as Error).message}`
      );
    }
  }
}

export default UserModel;
