import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ResetPasswordController {
  public async send(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendEmail = new SendForgotPasswordEmailService();

    const message = await sendEmail.execute({ email });

    return res.status(200).json(message);
  }

  public async reset(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPassword = new ResetPasswordService();

    const user = await resetPassword.execute({ token, password });

    return res.status(200).json(user);
  }
}
