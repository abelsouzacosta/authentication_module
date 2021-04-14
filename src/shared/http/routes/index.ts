import { Router } from 'express';
import userRouter from '@modules/users/routes/users.routes';
import sessionRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/passwords.routes';

const router = Router();

router.use('/users', userRouter);

router.use('/sessions', sessionRouter);

router.use('/password', passwordRouter);

export default router;
