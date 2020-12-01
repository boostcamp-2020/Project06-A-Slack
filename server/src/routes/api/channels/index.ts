import express from 'express';
import * as channelsController from './channels.controller';
import channelIdRouter from './[channelId]';

const router = express.Router();

router.get('/', channelsController.getChannels);
router.post('/', channelsController.createChannel);
router.use('/:channelId', channelIdRouter);

export default router;
