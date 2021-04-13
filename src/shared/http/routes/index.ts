import { Router } from 'express';
import userRouter from '@modules/users/routes/users.routes';

const router = Router();

router.use('/users', userRouter);

export default router;
