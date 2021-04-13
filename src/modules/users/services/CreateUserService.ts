import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const repository: UserRepository = getCustomRepository(UserRepository);

    const userByEmail = await repository.findByEmail(email);

    if (userByEmail) throw new AppError('This email are already in use');

    const passwordHash = await hash(password, 10);

    const user = repository.create({
      name,
      email,
      password: passwordHash,
    });

    await repository.save(user);

    return user;
  }
}
