import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import upload from '@config/upload';
import path from 'path';
import fs from 'fs';

interface IRequest {
  id: string;
  filename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ id, filename }: IRequest): Promise<User> {
    const repository: UserRepository = getCustomRepository(UserRepository);

    const user = await repository.findById(id);

    if (!user) throw new AppError('User not found');

    // se o usuario ja tiver um avatar
    if (user.avatar) {
      // junta o nome do diretorio de upload com o nome do arquivo do avatar
      const avatarFilePath = path.join(upload.directory, user.avatar);

      // verifica se o arquivo realmente existe
      const avatarFileExists = await fs.promises.stat(avatarFilePath);

      // remove arquivo antigo
      if (avatarFileExists) await fs.promises.unlink(avatarFilePath);
    }

    user.avatar = filename;

    await repository.save(user);

    return user;
  }
}
