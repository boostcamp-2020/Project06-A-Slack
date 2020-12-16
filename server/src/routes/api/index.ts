import express from 'express';
import { authenticated } from '@/middlewares/auth.middleware';
import userRouter from './users';
import channelRouter from './channels';
import authRouter from './auth';
import threadRouter from './threads';
import emojiRouter from './emojis';
import oauthRouter from './oauth';

const router = express.Router();

router.use('/users', authenticated, userRouter);
router.use('/channels', authenticated, channelRouter);
router.use('/auth', authRouter);
router.use('/threads', authenticated, threadRouter);
router.use('/emojis', authenticated, emojiRouter);
router.use('/oauth', oauthRouter);

export default router;
