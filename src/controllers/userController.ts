import { Request, Response } from 'express';
import MainDataSource from '../databases/main-data-source';
import { hashPassword } from '../utils/crypto';
import Exceptions from '../common/exceptions';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user';
import { ValidateDto } from '../middlewares/validationHandler';
import User from '../entities/user';

const userRepo = MainDataSource.getRepository(User);

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

  @ValidateDto(CreateUserDTO)
  static async create(req: Request, res: Response) {
    const { username, email, password } = req.body;

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

  @ValidateDto(UpdateUserDTO)
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
}

export default UserController;
