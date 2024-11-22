import { Request, Response } from 'express';
import Exceptions from '../common/exceptions';
import MainDataSource from '../databases/main-data-source';
import { Cart } from '../entities/cart';
import User from '../entities/user';
import CartProduct from '../entities/cart-product';
import { validateDto } from '../utils/valitator';
import { AddProductDto } from '../dtos/cart';

const cartRepo = MainDataSource.getRepository(Cart);
const userRepo = MainDataSource.getRepository(User);
const cartProductRepo = MainDataSource.getRepository(CartProduct);

const findOrCreateCart = async (userId: number) => {
    let cart = await cartRepo.findOneBy({
        user: {
            id: userId
        }
    });

    if (!cart) {
        const user = await userRepo.findOneBy({
            id: userId
        });

        if (!user) {
            throw Exceptions.notFound('User');
        }

        cart = await cartRepo.save(cartRepo.create(user))
    }

    return cart;
}

export const getByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const cart = await findOrCreateCart(+userId);

    const userCart = await cartProductRepo.createQueryBuilder('cart_product')
    .leftJoinAndSelect('cart_product.product', 'product')
    .where('cart_product.cart = :cartId', { cartId: cart.id })
    .getMany()

    return res.json(userCart).status(200);
}

export const updateProductQuantity = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { product_id, quantity } = await validateDto(AddProductDto, req.body);

    const cart = await findOrCreateCart(+userId);

    if(quantity === 0) {
        await cartProductRepo.delete({
            cart: {
                id: cart.id
            },
            product: {
                id: product_id
            }
        });

        return res.status(204).send();
    }

    const product = await cartProductRepo.findOneBy({
        product: {
            id: product_id
        },
        cart: {
            id: cart.id
        }
    });

    if (product) {
        product.quantity = quantity === 1 ? product.quantity + 1 : quantity;
        await cartProductRepo.save(product);
    } else {
        await cartProductRepo.save(cartProductRepo.create({
            cart: cart,
            product: {
                id: product_id
            },
            quantity: quantity
        }));
    }

    return res.status(201).send();
}

export default {
    getByUserId,
    updateProductQuantity
}