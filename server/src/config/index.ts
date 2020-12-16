import { PoolOptions } from 'mysql2/promise';

interface Config {
  host: string;
  oauth: {
    google: {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
    };
  };
  jwtSecret: string;
  jwtRefreshSecret: string;
  devDB: PoolOptions;
  DB: PoolOptions;
  swaggerDefinition: any;
  NODE_MAILER: {
    email: string;
    pw: string;
  };
}

const config: Config = {
  host:
    process.env.MODE === 'dev' ? (process.env.DEV_HOST as string) : (process.env.HOST as string),
  oauth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${
        process.env.MODE === 'dev' ? (process.env.DEV_HOST as string) : (process.env.HOST as string)
      }/api/oauth/google/callback`,
    },
  },
  jwtSecret: process.env.JWT_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
  NODE_MAILER: {
    email: process.env.NODEMAILER_EMAIL as string,
    pw: process.env.NODEMAILER_PW as string,
  },
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
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Project-06-Slack', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Slack API', // Description (optional)
    },
    host: 'localhost:3000', // Host (optional)
    basePath: '/', // Base path (optional)
    consumes: 'application/json',
    produces: 'application/json',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};

export default config;
