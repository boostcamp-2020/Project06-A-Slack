import express from 'express';
import * as authController from './auth.controller';

const router = express.Router({ mergeParams: true });

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);

export default router;
