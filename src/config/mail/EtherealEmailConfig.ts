import AppError from '@shared/errors/AppError';
import nodemailer from 'nodemailer';
import HandlebarsTemplate from './HandlebarsTemplate';

interface IMailContent {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseEmailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContent;
  from?: IMailContent;
  subject: string;
  templateData: IParseEmailTemplate;
}

export default class EtherealEmailConfig {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<string | false> {
    const account = await nodemailer.createTestAccount();

    if (!account) throw new AppError('Email account not created');

    const mailTemplate = new HandlebarsTemplate();

    // criando o transporter necessário para enviar a mensagem
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || '[Sistema de autenticação] - recuperação de senha',
        address: from?.email || 'no-reply@password.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    const messageUrl = nodemailer.getTestMessageUrl(message);

    return messageUrl;
  }
}
