import express from 'express';
import * as channelIdController from './channelId.controller';

const router = express.Router({ mergeParams: true });

router.get('/', channelIdController.getChannel);
router.post('/', channelIdController.modifyChannel);
router.delete('/', channelIdController.deleteChannel);
router.post('/invite', channelIdController.inviteChannel);
router.post('/topic', channelIdController.modifyTopic);
router.post('/unread', channelIdController.setChannelUnreadFlag);

export default router;
