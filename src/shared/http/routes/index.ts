import { Router } from 'express';
import userRouter from '@modules/users/routes/users.routes';
import sessionRouter from '@modules/users/routes/sessions.routes';

const router = Router();

router.use('/users', userRouter);

router.use('/sessions', sessionRouter);

export default router;
