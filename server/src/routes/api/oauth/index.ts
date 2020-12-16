import express from 'express';
import * as oauthController from './oauth.controller';

const router = express.Router();

router.get('/google', oauthController.oauthLogin);
router.get('/google/callback', oauthController.handleAuth, oauthController.handleSuccess);
router.get('/google/failure', oauthController.failure);
router.post('/google/signup', oauthController.googleSignup);

export default router;
