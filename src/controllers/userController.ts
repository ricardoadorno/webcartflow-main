import { Request, Response } from 'express';
import MainDataSource from '../databases/main-data-source';
import { hashPassword } from '../utils/crypto';
import Exceptions from '../common/exceptions';
import { CreateRatingDto, CreateUserDTO, UpdateUserDTO } from '../dtos/user';
import User from '../entities/user';
import { validateDto } from '../utils/valitator';
import Rating from '../entities/rating';
import Product from '../entities/product';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../common/config/constants';

const userRepo = MainDataSource.getRepository(User);
const productRepo = MainDataSource.getRepository(Product);
const ratingRepo = MainDataSource.getRepository(Rating);

class UserController {
  static async get(req: Request, res: Response) {
    const users = await userRepo.find();
    res.json(users).status(200);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userRepo.findOneBy({
      id: +id,
    });

    if (!user) {
      throw Exceptions.notFound('User');
    }

    res.json(user).status(200);
  }

  static async create(req: Request, res: Response) {
    const { username, email, password } = await validateDto(CreateUserDTO, req.body);

    const emailExists = await userRepo.findOneBy({ email });
    if (emailExists) {
      throw Exceptions.conflict('Email');
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await hashPassword(password);

    await userRepo.save(user);

    res.status(200).send('User created');
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await userRepo.findOneBy({
      id: +id,
    });

    if (!user) {
      throw Exceptions.notFound('User');
    }

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    await userRepo.save(user);

    res.status(200).send('User updated');
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userRepo.findOneBy({
      id: +id,
    });

    if (!user) {
      throw Exceptions.notFound('User');
    }

    await userRepo.remove(user);

    res.status(200).send('User removed');
  }

  static async createRating(req: Request, res: Response) {
    const { rate, comment, product_id } = await validateDto(CreateRatingDto, req.body);

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw Exceptions.unauthorized();
    }

    const { id } = jwt.verify(token, jwtSecret) as { id: number };

    const product = await productRepo.findOneBy({ id: product_id });
    const user = await userRepo.findOneBy({ id: id });

    if (!product) {
      throw Exceptions.notFound('Product');
    }

    if (!user) {
      throw Exceptions.notFound('User');
    }

    const newRating = ratingRepo.create({ rate, comment, product , user});

    await ratingRepo.save(newRating);

    res.status(200).send('Review added');
  }
    
}

export default UserController;
