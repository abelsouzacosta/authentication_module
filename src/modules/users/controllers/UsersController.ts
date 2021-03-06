import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const list = new ListUserService();

    const users = await list.execute();

    return res.status(200).json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const create = new CreateUserService();

    const user = await create.execute({ name, email, password });

    return res.status(200).json(user);
  }
}
