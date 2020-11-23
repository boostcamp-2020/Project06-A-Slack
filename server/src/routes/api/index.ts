import express from 'express';
import userRouter from './users';
import channelRouter from './channels';

const router = express.Router();

router.use('/users', userRouter);
router.use('/channels', channelRouter);
export default router;
