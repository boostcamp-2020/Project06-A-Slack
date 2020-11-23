import express from 'express';
import userRouter from './users';
import threadRouter from './threads';

const router = express.Router();

router.use('/users', userRouter);
router.use('/threads', threadRouter);

export default router;
