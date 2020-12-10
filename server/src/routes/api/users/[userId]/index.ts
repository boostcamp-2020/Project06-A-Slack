import express from 'express';
import * as userIdController from './userId.controller';

const router = express.Router({ mergeParams: true });

router.use(userIdController.checkUserIdParam);
router.get('/', userIdController.getUser);
router.post('/', userIdController.modifyUser);
router.delete('/', userIdController.deleteUser);
router.post('/last-channel', userIdController.modifyLastChannel);
router.get('/channels', userIdController.getJoinedChannels);
router.get('/channels/unsubscribed', userIdController.getNotJoinedChannels);

export default router;
