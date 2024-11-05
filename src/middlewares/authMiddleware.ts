import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../common/config/constants';
import Exceptions from '../common/exceptions';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw Exceptions.unauthorized();
  }

  try {
    const splitToken = token.split('Bearer ')[1];

    jwt.verify(splitToken, jwtSecret);

    next();
  } catch (error) {
    throw Exceptions.unauthorized();
  }
};

export default authMiddleware;
