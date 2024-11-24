import { NextFunction, Request, Response } from 'express';
import { reviewSchema } from '../utils/review.schema';

export const validateReviewsData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    reviewSchema.parse(req.body);
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
