import { Router } from 'express';
import userRouter from './user.router';
import authRouter from './auth.router';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello from api v1!');
});

router.use('/auth', authRouter);

router.use('/user', userRouter);

export default router;
