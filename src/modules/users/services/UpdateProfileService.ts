import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  public async execute({
    id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const repository: UserRepository = getCustomRepository(UserRepository);

    const user = await repository.findById(id);

    if (!user) throw new AppError('User not found');

    // verifica se há um password
    if (password) {
      // verifica se o password antigo foi digitado
      if (!old_password) throw new AppError('Old password is required');

      // verifica se o password e valido
      const comparePassword = await compare(old_password, user.password);

      if (!comparePassword) throw new AppError('Invalid password');

      const hashedNewPassword = await hash(password, 10);

      user.password = hashedNewPassword;
    }

    // verifica se há um email
    if (email) {
      // verifica se há um usuário com o mesmo email
      const userByEmail = await repository.findByEmail(email);

      // verifica se o id de userByEmail é o mesmo recebido por parâmetro
      if (userByEmail && userByEmail.id !== id)
        throw new AppError('This email are already in use');

      user.email = email;
    }

    await repository.save(user);

    return user;
  }
}
