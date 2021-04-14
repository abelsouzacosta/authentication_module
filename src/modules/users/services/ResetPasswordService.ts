import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<User> {
    const tokenRepository = getCustomRepository(UserTokenRepository);
    const userRepository = getCustomRepository(UserRepository);

    const userToken = await tokenRepository.findByToken(token);

    if (!userToken) throw new AppError('Token not found');

    const user = await userRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User not found');

    // verifica se o token já foi utilizado
    if (userToken.was_used) throw new AppError('This token already been used.');

    // captura a hora em que o token foi criado
    const tokenCreated = userToken.created_at;
    // adiciona o período de 2 horas de tolerancia
    const compareTime = addHours(tokenCreated, 2);

    // verifica se o token ainda pode ser utilizado
    if (isAfter(Date.now(), compareTime))
      throw new AppError('Token expired, generate another token');

    const hashedPassword = await hash(password, 10);

    // modificando a senha de usuário
    user.password = hashedPassword;
    // colocando o token como utilizado
    userToken.was_used = true;

    // salvando o usuário
    await userRepository.save(user);
    // salvando alterações na tabela de token
    await tokenRepository.save(userToken);

    return user;
  }
}
