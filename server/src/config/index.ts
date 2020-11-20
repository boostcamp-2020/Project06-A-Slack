import * as session from 'express-session';
import expressMySqlSession from 'express-mysql-session';
import { PoolOptions } from 'mysql2/promise';

const MySQLStore = expressMySqlSession(session);
interface Config {
  devDB: PoolOptions;
  DB: PoolOptions;
  devSession: session.SessionOptions;
  session: session.SessionOptions;
}

const config: Config = {
  devDB: {
    host: process.env.DB_DEV_HOST,
    user: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASS,
    port: Number(process.env.DB_DEV_PORT),
    database: process.env.DB_DEV_NAME,
    connectionLimit: 20,
    dateStrings: ['DATE'],
    multipleStatements: true,
  },
  DB: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    connectionLimit: 20,
    dateStrings: ['DATE'],
    multipleStatements: true,
  },
  devSession: {
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: process.env.DB_DEV_HOST,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASS,
      port: Number(process.env.DB_DEV_PORT),
      database: process.env.DB_DEV_NAME,
      checkExpirationInterval: 1000 * 60 * 15, // 만료된 세션 체크 간격 15분
      expiration: 1000 * 60 * 60, // 세션 만료시간 60분
    }),
  },
  session: {
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      checkExpirationInterval: 1000 * 60 * 15, // 만료된 세션 체크 간격 15분
      expiration: 1000 * 60 * 60, // 세션 만료시간 60분
    }),
  },
};

export default config;
