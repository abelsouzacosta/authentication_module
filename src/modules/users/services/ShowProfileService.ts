import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';

interface IRequest {
  id: string;
}

export default class ShowProfileService {
  public async execute({ id }: IRequest): Promise<User> {
    const repository: UserRepository = getCustomRepository(UserRepository);

    const user = await repository.findById(id);

    if (!user) throw new AppError('User not found');

    return user;
  }
}
