import express from 'express';
import * as usersController from './users.controller';

const router = express.Router({ mergeParams: true });

router.get('/', usersController.getUsers);
router.get('/:userId', usersController.getUser);
router.post('/:userId', usersController.modifyUser);
router.delete('/:userId', usersController.deleteUser);
router.post('/:userId/last-channel', usersController.modifyLastChannel);

export default router;
