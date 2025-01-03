import { Router } from 'express';
import { getOauthProviders, oauthCallback, oauthSignIn } from './v1/controller/auth';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello from auth!');
});

router.get('/prviders', getOauthProviders);
router.post('/sign-in', oauthSignIn);
router.post('/callback', oauthCallback);

export default router;
