import { Request, Response, NextFunction } from 'express';
import { IncomingForm } from 'formidable';
import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { verifyRequestData, verifyToken } from '@/utils/utils';
import { userModel } from '@/models';
import config from '@/config';
import { TIME, TOKEN_TYPE, ERROR_MESSAGE } from '@/utils/constants';
import redisClient from '@/lib/redis';

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
          const { pw: userPw, ...userInfo } = user;
          const accessToken = jwt.sign(userInfo, config.jwtSecret, { expiresIn: TIME.FIVE_MINUTE });
          const refreshToken = jwt.sign(userInfo, config.jwtRefreshSecret, {
            expiresIn: TIME.TWO_MONTH,
          });
          // 해당 유저의 refresh token 설정
          await redisClient.set(user.id, refreshToken);
          await redisClient.expire(user.id, TIME.TWO_MONTH);

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
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { refreshToken } = req.body;
  if (verifyRequestData([refreshToken])) {
    /* 유저id key 값으로 저장된 refresh token을 삭제 */
    try {
      const decodedRefreshToken = await verifyToken(refreshToken, TOKEN_TYPE.REFRESH);
      const { id } = decodedRefreshToken;
      await redisClient.del(id);
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        res.status(401).json({ message: ERROR_MESSAGE.INVALID_TOKEN });
        return;
      }
      next(err);
      return;
    }
  }
  res.status(200).end();
};

/**
 * POST /api/auth/signup
 */
export const signup = (req: Request, res: Response, next: NextFunction): void => {
  const form = new IncomingForm();
  form.uploadDir = './src/public/imgs/profile/';
  form.keepExtensions = true;
  form.multiples = true;

  form.on('fileBegin', (name, file) => {
    const imgSrc = `${Date.now()}_${file.name}`;
    // eslint-disable-next-line no-param-reassign
    file.path = `${form.uploadDir}${imgSrc}`;
  });

  const port = req.app.get('port');
  const prefix = `${req.protocol}://${req.hostname}${port !== 80 ? `:${port}` : ''}`;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const { email, pw } = fields;
    const { image } = files;
    console.log(image.name);
    if (verifyRequestData([email, pw])) {
      // TODO : DB에 회원정보 저장
      res.json({ email, image: `${prefix}/${image.name}` });
      return;
    }
    res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
  });
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
      const claims = await verifyToken(refreshToken, TOKEN_TYPE.REFRESH);

      /* 유저 refresh 토큰 일치 여부 확인 */
      const result = await redisClient.get(claims.id);
      if (result !== refreshToken) {
        res.status(401).json({ message: ERROR_MESSAGE.INVALID_TOKEN });
        return;
      }

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
