import { Router } from 'express';
import { createUser, getUsers, getUser } from '../../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.post('/sign-up', createUser);
router.get('/:id', getUser);

export default router;
