import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { Joi, Segments, celebrate } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UpdateAvatarController from '../controllers/UpdateAvatarController';

const userRouter = Router();
const userController = new UsersController();
const upload = multer(uploadConfig);
const avatarController = new UpdateAvatarController();

userRouter.get('/', isAuthenticated, userController.index);

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

userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export default userRouter;
