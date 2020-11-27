import jwt from 'jsonwebtoken';
import config from '@/config';
import { AuthToken } from '@/types';
import { TOKEN_TYPE } from '@/utils/constants';
import { ChannelUsers } from '@/types/channelUsers';

export const verifyJWT = (token: string, type: AuthToken) => {
  return jwt.verify(token, type === TOKEN_TYPE.ACCESS ? config.jwtSecret : config.jwtRefreshSecret);
};

export const makeUserIcons = (users: ChannelUsers[]) => {
  let i = 0;
  const userIconList: ChannelUsers[] = [];
  while (i < users.length) {
    userIconList.push(users[i]);
    i += 1;
    if (i === 3) {
      break;
    }
  }
  return userIconList;
};
