import 'dotenv/config';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as createError from 'http-errors';
import * as cors from 'cors';
import { Error } from './types';

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

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ err });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
