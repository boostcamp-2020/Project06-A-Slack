import 'module-alias/register';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import cors from 'cors';
import { Error } from '@lib/types';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.json({ page: 'index' });
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ err });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
