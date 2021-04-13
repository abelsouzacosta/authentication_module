import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { Joi, Segments, celebrate } from 'celebrate';

const userRouter = Router();
const userController = new UsersController();

userRouter.get('/', userController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      confirm: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  userController.create,
);

export default userRouter;
