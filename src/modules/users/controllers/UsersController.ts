import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const create = new CreateUserService();

    const user = await create.execute({ name, email, password });

    return res.status(200).json(user);
  }
}
