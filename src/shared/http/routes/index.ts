import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.status(200).send({
    message: 'Ok',
  });
});

export default router;
