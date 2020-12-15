import passport from 'passport';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '@/config';
import { TIME } from '@/utils/constants';
import { User } from '@/types';

/**
 * GET /api/oauth/google
 */
export const oauthLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

/**
 * GET /api/oauth/google/callback
 */
export const handleAuth = passport.authenticate('google', {
  session: false,
  failureRedirect: '/api/oauth/google/failure',
});

export const handleSuccess = async (req: Request, res: Response): Promise<void> => {
  const { user }: any = req;
  // 비번 일치 할 때
  if (user) {
    const accessToken = jwt.sign(user, config.jwtSecret, { expiresIn: TIME.FIVE_MINUTE });
    const refreshToken = jwt.sign(user, config.jwtRefreshSecret, {
      expiresIn: TIME.TWO_MONTH,
    });
    res.redirect(
      `${config.host}?accessToken=${accessToken}&refreshToken=${refreshToken}&userId=${user.id}`,
    );
    return;
  }
  res.status(401).json({ message: 'google auth failed' });
};

/**
 * GET /api/oauth/google/failure
 */
export const failure = (req: Request, res: Response): void => {
  res.status(401).json({ message: 'google auth failed' });
};
