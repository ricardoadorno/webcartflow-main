import { NextFunction, Request, Response, Router } from 'express';

const asyncHandler = (fn: Function) => (req: Request,  res: Response, next: NextFunction) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};

const asyncErrorHandler = (router: Router) => {
    router.stack.forEach((layer) => {
      if (layer.route) {
        layer.route.stack.forEach((handler) => {
          handler.handle = asyncHandler(handler.handle);
        });
      }
    });
    return router;
}
  

export default asyncErrorHandler;