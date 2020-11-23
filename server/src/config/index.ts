import * as session from 'express-session';
import expressMySqlSession from 'express-mysql-session';
import { PoolOptions } from 'mysql2/promise';

const MySQLStore = expressMySqlSession(session);
interface Config {
  devDB: PoolOptions;
  DB: PoolOptions;
  devSession: session.SessionOptions;
  session: session.SessionOptions;
  swaggerDefinition: any;
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
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      // API informations (required)
      title: 'Project-06-Slack', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Slack API', // Description (optional)
    },
    host: 'localhost:3000', // Host (optional)
    basePath: '/', // Base path (optional)
    consumes: 'application/json',
    produces: 'application/json',
    // TODO: 보안 옵션 설정하기
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ jwt: ['123'] }],
  },
};

export default config;
