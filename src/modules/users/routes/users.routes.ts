import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { Joi, Segments, celebrate } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UpdateAvatarController from '../controllers/UpdateAvatarController';
import ProfileController from '../controllers/ProfileController';

const userRouter = Router();
const userController = new UsersController();
const upload = multer(uploadConfig);
const avatarController = new UpdateAvatarController();
const profileController = new ProfileController();

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

userRouter.get('/show_profile', isAuthenticated, profileController.show);

userRouter.post('/update_profile', isAuthenticated, profileController.update);

export default userRouter;
