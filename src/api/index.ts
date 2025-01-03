import { Router } from 'express';
import v1Router from './v1/router/index';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello from backend practice!');
});

router.use('/v1', v1Router);

export default router;
