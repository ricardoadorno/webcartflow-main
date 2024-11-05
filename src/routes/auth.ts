import { Router } from 'express';
import AuthController from '../controllers/authController';

const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/refresh', AuthController.refresh);

export default authRouter;
