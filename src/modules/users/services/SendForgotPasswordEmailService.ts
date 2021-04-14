import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import path from 'path';
import EtherealEmailConfig from '@config/mail/EtherealEmailConfig';

interface IRequest {
  email: string;
}

interface IResponse {
  token: string;
  message: string | false;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<IResponse> {
    const repository: UserTokenRepository = getCustomRepository(
      UserTokenRepository,
    );
    const userRepository: UserRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    // gera um token a partir do id do usuário encontrado
    const { token } = await repository.generate(user.id);

    // captura o template da página de forgot password
    const forgotPasswordEmailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const message = await EtherealEmailConfig.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Password Request] - Recuperação de senha',
      templateData: {
        file: forgotPasswordEmailTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3333/reset_password?token=${token}`,
        },
      },
    });

    return {
      token,
      message,
    };
  }
}
