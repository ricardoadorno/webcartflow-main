import { Router } from 'express';
import UserController from '../controllers/userController';
import ProductController from '../controllers/productController';
import authMiddleware from '../middlewares/authMiddleware';
import cartController from '../controllers/cartController';

const apiRouter = Router();

apiRouter.post('/users', UserController.create);
apiRouter.post('/ratings', UserController.createRating);

apiRouter.use(authMiddleware);

apiRouter.get('/users', UserController.get);
apiRouter.get('/users/:id', UserController.getById);
apiRouter.put('/users/:id',  UserController.update);
apiRouter.delete('/users/:id', UserController.remove);
apiRouter.get('/users/:id/cart', cartController.getByUserId);
apiRouter.put('/users/:id/cart/products', cartController.updateProductQuantity);

apiRouter.get('/products/search-options', ProductController.searchOptions);

apiRouter.get('/products', ProductController.get);
apiRouter.get('/products/:id', ProductController.getById);
apiRouter.post('/products', ProductController.create);



export default apiRouter;
