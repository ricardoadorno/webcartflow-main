import { Router } from 'express';
import UserController from '../controllers/userController';
import ProductController from '../controllers/productController';
import authMiddleware from '../middlewares/authMiddleware';

const apiRouter = Router();

apiRouter.post('/users', UserController.create);

apiRouter.use(authMiddleware);

apiRouter.get('/users', UserController.get);
apiRouter.get('/users/:id', UserController.getById);
apiRouter.put('/users/:id',  UserController.update);
apiRouter.delete('/users/:id', UserController.remove);

apiRouter.get('/products', ProductController.get);
apiRouter.get('/products/:id', ProductController.getById);
apiRouter.post('/products', ProductController.create);
apiRouter.get('/products/search-options', ProductController.searchOptions);

export default apiRouter;
