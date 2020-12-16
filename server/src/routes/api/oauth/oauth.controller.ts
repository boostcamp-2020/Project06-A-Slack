import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '@/config';
import { ERROR_MESSAGE, TIME } from '@/utils/constants';
import { User } from '@/types';
import axios from 'axios';
import { verifyRequestData } from '@/utils/utils';
import { userModel } from '@/models';

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
  res.status(401).json({ message: ERROR_MESSAGE.GOOGLE_OAUTH_FAILED });
};

/**
 * GET /api/oauth/google/failure
 */
export const failure = (req: Request, res: Response): void => {
  res.status(401).json({ message: ERROR_MESSAGE.GOOGLE_OAUTH_FAILED });
};

/**
 * POST /api/oauth/google/signup
 */
export const googleSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { accessToken: googleAccessToken } = req.body;
  try {
    const { data, status } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${googleAccessToken}` },
    });
    if (status === 200) {
      const { email, name, picture } = data;
      if (verifyRequestData([email, name, picture])) {
        const [[user]]: [[User]] = await userModel.getUserByEmail({ email });

        let userInfo;
        if (user) {
          userInfo = { email: user.email, displayName: user.displayName, id: user.id };
        } else {
          const [{ insertId }] = await userModel.addOAuthUser({ email, displayName: name });
          userInfo = { email, displayName: name, id: insertId };
        }

        const accessToken = jwt.sign(userInfo, config.jwtSecret, { expiresIn: TIME.FIVE_MINUTE });
        const refreshToken = jwt.sign(userInfo, config.jwtRefreshSecret, {
          expiresIn: TIME.TWO_MONTH,
        });

        res.json({ accessToken, refreshToken, user: userInfo });
        return;
      }
    }
    res.status(401).json({ message: ERROR_MESSAGE.GOOGLE_OAUTH_SIGNUP_FAILED });
  } catch (err) {
    next(err);
  }
};
