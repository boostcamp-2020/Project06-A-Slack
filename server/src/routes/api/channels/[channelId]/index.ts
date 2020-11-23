import express from 'express';
import * as channelIdController from './channelId.controller';

const router = express.Router({ mergeParams: true });

router.get('/', channelIdController.getChannel);
router.post('/invite', channelIdController.inviteChannel);
router.post('/', channelIdController.modifyChannel);
router.delete('/', channelIdController.deleteChannel);

export default router;
