import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { Joi, Segments, celebrate } from 'celebrate';

const sessionRouter = Router();
const controller = new SessionsController();

sessionRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  controller.create,
);

export default sessionRouter;
