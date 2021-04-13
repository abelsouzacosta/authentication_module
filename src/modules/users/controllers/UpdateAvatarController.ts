import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UpdateAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      id: req.user.id,
      filename: req.file.filename,
    });

    return res.status(200).json(user);
  }
}
