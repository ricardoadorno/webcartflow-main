import { NextFunction, Request, Response, Router } from 'express';
import BaseException from './baseException';

export const exceptionHandler = (err: BaseException, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({ message: err.message, status: err.status, type: err.type });
}

const asyncHandler = (fn: Function) => (req: Request,  res: Response, next: NextFunction) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};

export const asyncExceptionHandler = (router: Router) => {
    router.stack.forEach((layer) => {
      if (layer.route) {
        layer.route.stack.forEach((handler) => {
          handler.handle = asyncHandler(handler.handle);
        });
      }
    });
    return router;
}
  
