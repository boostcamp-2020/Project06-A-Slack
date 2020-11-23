import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { IncomingForm } from 'formidable';

/**
 * POST /api/auth/login
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, pw } = req.body;
  if (verifyRequestData([email, pw])) {
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};

/**
 * POST /api/auth/logout
 */
export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).end();
};

/**
 * POST /api/auth/signup
 */
export const signup = (req: Request, res: Response, next: NextFunction) => {
  const form = new IncomingForm();
  form.uploadDir = './src/public/imgs/';
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
    if (verifyRequestData([email, pw])) {
      res.json({ email, image: `${prefix}/temp_name` });
      return;
    }
    res.status(400).json({ message: '필수 값 누락' });
  });
};
