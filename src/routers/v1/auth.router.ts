import { Router } from 'express';
import { changePassword, getLogin, getLoginSuspicious, refreshToken, resendVerificationEmail, revokeToken, signIn, signOut, signOutAll, verifyEmail } from '../../controllers/auth.controller';

const router = Router();

router.post('/sign-in', signIn);
router.post('/sign-out', signOut);
router.post('/sign-out-all', signOutAll);

router.post('/client-token');
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', revokeToken);

router.post('/change-password', changePassword);

router.post('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);

router.get('login/:id', getLogin);
router.get('login/suspicious/:id', getLoginSuspicious);

export default router;
