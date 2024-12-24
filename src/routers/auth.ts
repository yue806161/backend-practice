import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello from auth!');
});

router.post('/callback');

export default router;
