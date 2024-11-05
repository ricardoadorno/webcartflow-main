import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import  MainDataSource  from '../databases/main-data-source';
import { comparePassword } from '../utils/crypto';
import { LoginDto } from '../dtos/user';
import Exceptions from '../common/exceptions';
import { jwtSecret } from '../common/config/constants';
import { ValidateDto } from '../middlewares/validationHandler';
import User from '../entities/user';

const userRepo = MainDataSource.getRepository(User);

class AuthController {

  @ValidateDto(LoginDto)
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      throw Exceptions.unauthorized();
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      throw Exceptions.unauthorized();
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });

    return res.json({ accessToken, refreshToken }).status(200);
  }

  static async refresh(req: Request, res: Response) {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken, jwtSecret) as { id: number, username: string, email: string };

      const payload = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      };

      const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      res.json({ accessToken }).status(200);
    } catch (error) {
      return res.status(400).send('Invalid refresh token.');
    }
  }
}

export default AuthController;