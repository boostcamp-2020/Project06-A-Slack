import 'module-alias/register';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import cors from 'cors';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Error } from '@/types';
import config from '@/config';
import apiRouter from '@/routes/api';
import { bindSocketServer } from '@/lib/socket';
import passport from 'passport';
import passportConfig from '@/lib/passport';

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

bindSocketServer(server);

/* Swagger */
const options = {
  swaggerDefinition: config.swaggerDefinition,
  apis: ['./src/routes/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

app.set('port', port);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(passport.initialize());
passportConfig();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', apiRouter);
app.all('*', (req, res) => {
  if (process.env.MODE === 'dev') {
    res.redirect(process.env.DEV_CLIENT_HOST as string);
    return;
  }
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const { message, status = 500 } = err;
  res.status(status).json({ message, status });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
