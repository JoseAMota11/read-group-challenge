import { config } from '../config/config';
import db from '../config/db';
import { User } from '../types/user.type';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserModel {
  static create(user: User) {
    const { username, email, password } = user;
    const id = crypto.randomUUID();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const stmt = db.prepare(
      `INSERT INTO Users (id, username, email, password) VALUES (?, ?, ?, ?)`
    );

    const info = stmt.run(id, username, email, hashedPassword);

    return { id, changes: Boolean(info.changes) };
  }

  static find(user: Pick<User, 'email' | 'password'>) {
    const { email, password } = user;

    const stmt = db.prepare(`SELECT * FROM Users WHERE email = ?`);
    const dbUser = stmt.get(email) as User;

    if (!dbUser) {
      throw new Error('Credenciales inválidas.');
    }

    const isPasswordValid = bcrypt.compareSync(password, dbUser.password);

    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas.');
    }

    const token = jwt.sign(
      { id: dbUser.id, username: dbUser.username },
      config.SECRET_KEY,
      { expiresIn: '6h' }
    );

    return { token };
  }
}
