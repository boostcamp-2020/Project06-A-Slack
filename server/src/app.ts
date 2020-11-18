import 'module-alias/register';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import cors from 'cors';
import { Error } from '@lib/types';
import SocketIO, { Socket } from 'socket.io';
import http from 'http';

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new SocketIO.Server(server, {
  transports: ['websocket', 'polling'],
  cors: { origin: '*' },
});

const channel1 = io.of('/channel1');
const channel2 = io.of('/channel2');

channel1.on('connection', (socket: Socket) => {
  console.log('채널 1 연결된 socketID : ', socket.id);
  io.to(socket.id).emit('my socket id', { socketId: socket.id });

  socket.on('msg', (data) => {
    console.log('channel 1 메시지', data);
  });

  socket.on('disconnect', () => {
    console.log('연결 끊김, 바이');
  });
});

channel2.on('connection', (socket: Socket) => {
  console.log('채널 2 연결된 socketID : ', socket.id);
  io.to(socket.id).emit('my socket id', { socketId: socket.id });

  socket.on('msg', (data) => {
    console.log('channel 2 메시지', data);
  });

  socket.on('disconnect', () => {
    console.log('연결 끊김, 바이');
  });
});

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

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
