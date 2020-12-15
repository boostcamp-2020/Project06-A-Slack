import express from 'express';
import * as channelsController from './channels.controller';
import channelIdRouter from './[channelId]';

const router = express.Router();

router.get('/', channelsController.getChannels);
router.post('/', channelsController.createChannel);
router.post('/check-duplicated', channelsController.checkDuplicatedChannel);
router.use('/:channelId', channelIdRouter);

export default router;
