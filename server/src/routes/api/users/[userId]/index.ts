import express from 'express';
import * as userIdController from './userId.controller';

const router = express.Router({ mergeParams: true });

router.get('/', userIdController.getUser);
router.post('/', userIdController.modifyUser);
router.delete('/', userIdController.deleteUser);
router.post('/last-channel', userIdController.modifyLastChannel);

export default router;
