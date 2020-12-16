import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import {
  verifyRequestData,
  verifyToken,
  getRandomString,
  encrypt,
  decrypt,
  sendEmail,
} from '@/utils/utils';
import { channelModel, userModel } from '@/models';
import config from '@/config';
import { TIME, TOKEN_TYPE, ERROR_MESSAGE } from '@/utils/constants';
import isEmail from 'validator/lib/isEmail';

/**
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, pw } = req.body;
  if (verifyRequestData([email, pw])) {
    const [[user]] = await userModel.getUserByEmail({ email });
    if (user) {
      try {
        const match = await bcrypt.compare(pw, user.pw);
        if (match) {
          // 비번 일치 할 때
          const { pw: userPw, phoneNumber, image, ...userInfo } = user;
          const accessToken = jwt.sign(userInfo, config.jwtSecret, { expiresIn: TIME.FIVE_MINUTE });
          const refreshToken = jwt.sign(userInfo, config.jwtRefreshSecret, {
            expiresIn: TIME.TWO_MONTH,
          });

          res.json({ accessToken, refreshToken, user: userInfo });
          return;
        }
        res.status(401).json({ message: ERROR_MESSAGE.WRONG_PW });
        return;
      } catch (err) {
        next(err);
        return;
      }
    }
    res.status(401).json({ message: ERROR_MESSAGE.WRONG_USER });
    return;
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * POST /api/auth/logout
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (verifyRequestData([refreshToken])) {
    try {
      await verifyToken(refreshToken, TOKEN_TYPE.REFRESH);
    } catch (err) {
      console.error(err);
    }
  }
  res.status(200).end();
};

/**
 * POST /api/auth/signup
 */
export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, pw, displayName } = req.body;
  if (verifyRequestData([email, pw, displayName])) {
    try {
      const hashPw = await bcrypt.hash(pw, 10);
      const [{ insertId }] = await userModel.addUser({ email, pw: hashPw, displayName });
      await channelModel.setUserChannel({ userId: insertId });

      res.status(200).end();
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * POST /api/auth/token/refresh
 */
export const refreshAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { refreshToken } = req.body;
  if (verifyRequestData([refreshToken])) {
    try {
      const decoded = await verifyToken(refreshToken, TOKEN_TYPE.REFRESH);
      const { iat, exp, ...claims } = decoded;

      /* refresh 검증되면 새로운 access 토큰 생성 */
      const newAccessToken = jwt.sign(claims, config.jwtSecret, { expiresIn: TIME.FIVE_MINUTE });

      res.json({ accessToken: newAccessToken });
      return;
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        res.status(401).json({ message: ERROR_MESSAGE.INVALID_TOKEN });
        return;
      }
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * POST /api/auth/email/verify
 */
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const code = getRandomString(6);
  const { email: userEmail } = req.body;
  const content = `인증 코드 : ${code.slice(0, 3)}-${code.slice(3, 6)}`;

  if (!isEmail(userEmail)) {
    next({ message: ERROR_MESSAGE.INVALID_EMAIL, status: 400 });
    return;
  }

  try {
    await sendEmail(userEmail, content);
  } catch (err) {
    next({ message: ERROR_MESSAGE.SEND_EMAIL_FAILED, status: 500 });
    return;
  }

  try {
    const verifyCode = encrypt(code);
    res.json({ verifyCode });
  } catch (err) {
    next({ message: ERROR_MESSAGE.CODE_GENERATION_FAILED, status: 500 });
  }
};

/**
 * POST /api/auth/email/check
 */
export const checkExistEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email } = req.body;
  if (verifyRequestData([email])) {
    const [[user]] = await userModel.getUserByEmail({ email });
    if (!user) {
      res.status(200).end();
      return;
    }
    res.status(400).json({ message: ERROR_MESSAGE.EXIST_EMAIL });
    return;
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
