import express from 'express';
import { authenticated } from '@/middlewares/auth.middleware';
import userRouter from './users';
import channelRouter from './channels';
import authRouter from './auth';
import threadRouter from './threads';

const router = express.Router();

router.use('/users', authenticated, userRouter);
router.use('/channels', channelRouter);
router.use('/auth', authenticated, authRouter);
router.use('/threads', authenticated, threadRouter);

export default router;
