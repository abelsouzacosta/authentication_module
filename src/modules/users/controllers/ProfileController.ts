import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const show = new ShowProfileService();

    const profile = await show.execute({
      id: req.user.id,
    });

    return res.status(200).json(profile);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;

    const update = new UpdateProfileService();

    const profile = await update.execute({
      id: req.user.id,
      name,
      email,
      password,
      old_password,
    });

    return res.status(200).json(profile);
  }
}
