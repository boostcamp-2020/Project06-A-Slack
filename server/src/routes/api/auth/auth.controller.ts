import { Request, Response, NextFunction } from 'express';
import { IncomingForm } from 'formidable';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyRequestData } from '@/utils/utils';
import { userModel } from '@/models';
import config from '@/config';

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
          // 비번 일치
          const claims = { id: user.id, email: user.email };
          const token = jwt.sign(claims, config.jwtSecret, { expiresIn: 21600 });
          res.json({ token });
          return;
        }
        res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        return;
      } catch (err) {
        next(err);
        return;
      }
    }
    res.status(401).json({ message: '해당하는 사용자가 없습니다.' });
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};

/**
 * POST /api/auth/logout
 */
export const logout = (req: Request, res: Response): void => {
  // TODO : authToken으로 로그아웃 처리
  const authToken = req.headers.authorization?.split('Bearer ')[1];
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
    console.log(image);
    if (verifyRequestData([email, pw])) {
      // TODO : 이미지 이름 처리하는 것 구현
      res.json({ email, image: `${prefix}/temp_name` });
      return;
    }
    res.status(400).json({ message: '필수 값 누락' });
  });
};
