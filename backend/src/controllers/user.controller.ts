import { UserModel } from '../models/user.model';
import { User } from '../types/user.type';
import { Request, Response } from 'express';

export class UserController {
  static register(req: Request, res: Response) {
    const user = req.body as User;

    const { changes } = UserModel.create(user);

    if (changes) {
      res.status(200).json({ message: 'Usuario creado satisfactoriamente' });
    }
  }

  static login(req: Request, res: Response) {
    const user = req.body as Pick<User, 'email' | 'password'>;

    try {
      const { token } = UserModel.find(user);

      res.status(200).json({ token });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Credenciales inválidas.'
      ) {
        res.status(401).json({ message: 'Email o contraseña incorrectos.' });
      }
    }
  }
}
