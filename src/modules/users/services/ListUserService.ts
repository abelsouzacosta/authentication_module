import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const repository: UserRepository = getCustomRepository(UserRepository);

    const users = await repository.find();

    if (!users) throw new AppError('Any user was found in the database');

    return users;
  }
}
