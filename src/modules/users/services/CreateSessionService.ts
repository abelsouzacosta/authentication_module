import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const repository: UserRepository = getCustomRepository(UserRepository);

    const user = await repository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const correctPassword = await compare(password, user.password);

    if (!correctPassword) throw new AppError('Password incorrect');

    const token = sign({}, String(auth.jwt.secret), {
      expiresIn: '1d',
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}
