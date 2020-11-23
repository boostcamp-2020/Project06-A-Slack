import express from 'express';
import userRouter from './users';
import authRouter from './auth';
import threadRouter from './threads';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/threads', threadRouter);

export default router;
