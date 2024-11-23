import { UserController } from '../controllers/user.controller';
import {
  validateRegisterData,
  validateLoginData,
} from '../middlewares/user.middleware';
import { Router } from 'express';

const userRouter = Router();

// Routes
userRouter.post('/register', validateRegisterData, UserController.register);
userRouter.post('/login', validateLoginData, UserController.login);

export default userRouter;
