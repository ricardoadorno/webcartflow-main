import { NextFunction, Request, Response } from 'express';
import BaseException from './baseException';

const exceptionHandler = (err: BaseException, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status).json({ message: err.message });
}

export default exceptionHandler;