import { Request, Response, NextFunction } from 'express';
import { userLoginSchema, userRegisterSchema } from '../utils/user.schema';

export const validateRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userRegisterSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      res.status(400).json({
        message: 'Error en la validación de los datos.',
        errors: (error as any).errors,
      });
    } else {
      res.status(400).json({ message: 'Datos no válidos.' });
    }
  }
};

export const validateLoginData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userLoginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      res.status(400).json({
        message: 'Error en la validación de los datos de login.',
        errors: (error as any).errors,
      });
    } else {
      res.status(400).json({ message: 'Datos no válidos para el login.' });
    }
  }
};
