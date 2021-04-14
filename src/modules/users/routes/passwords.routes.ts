import { Router } from 'express';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const controller = new ResetPasswordController();

passwordRouter.post('/forgot', controller.send);

passwordRouter.post('/reset', controller.reset);

export default passwordRouter;
