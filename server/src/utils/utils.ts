import jwt from 'jsonwebtoken';
import config from '@/config';
import { AuthToken } from '@/types';
import { TOKEN_TYPE } from '@/utils/constants';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const CIPHER_ALGORITHM = process.env.CIPHER_ALGORITHM as string;
const CIPHER_KEY = process.env.CIPHER_KEY as string;
const IV = process.env.IV as string;

export const verifyRequestData = (arr: any[]): boolean =>
  arr.every((e) => {
    return e !== undefined && e !== null;
  });

export const verifyToken = (authToken: string, type: AuthToken): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      authToken,
      type === TOKEN_TYPE.ACCESS ? config.jwtSecret : config.jwtRefreshSecret,
      (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }

        if (decoded) {
          resolve(decoded);
        }
      },
    );
  });
};

export const getRandomString = (len: number): string => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array(len)
    .fill(1)
    .reduce((acc) => acc + str.charAt(Math.floor(Math.random() * str.length)), '');
};

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, CIPHER_KEY, IV);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
};

export const decrypt = (text: string): string => {
  const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, CIPHER_KEY, IV);
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
};

export const sendEmail = (targetEmail: string, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'naver',
      auth: {
        user: config.NODE_MAILER.email,
        pass: config.NODE_MAILER.pw,
      },
    });
    const mailOptions = {
      from: `슬랙_06<${config.NODE_MAILER.email}>`,
      to: targetEmail,
      subject: '[슬랙_06] 이메일 인증',
      text: content,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
        return;
      }
      transporter.close();
      resolve();
    });
  });
};
