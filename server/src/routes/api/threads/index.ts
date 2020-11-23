import express from 'express';
import * as threadsController from './threads.controller';
import threadIdRouter from './[threadId]';

const router = express.Router();

router.post('/', threadsController.createThread);
router.use('/:threadId', threadIdRouter);
router.get('/channels/:channelId', threadsController.getChannelThreads);

export default router;
