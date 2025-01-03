import { Router } from 'express';
import { createUser, getUsers, getUser } from '../controller/user';
import { handleError } from '../../../utils/error';

const router = Router();

router.get('/', handleError(getUsers));
router.post('/sign-up', handleError(createUser));
router.get('/:id', handleError(getUser));

export default router;
