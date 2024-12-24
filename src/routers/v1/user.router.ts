import { Router } from 'express';
import { createUser, getUsers } from '../../controllers/user.controller';

const router = Router();

router.post('/sign-up', createUser);
router.get('/:id', getUsers);

export default router;
