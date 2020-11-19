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
const io = new SocketIO.Server(server, { transports: ['websocket', 'polling'] });

const channel1 = io.of('/channel1');
const channel2 = io.of('/channel2');
const mainNamespace = io.of('/mainNamespace'); //namespace는 우리가 만들 서비스를 통째로 생각하면 된다. 안 정하면 '/'가 기본으로 들어간다.

mainNamespace.on('connection', (socket: Socket) => {
  //룸에 가입먼저 시켜, 가입 시키는 이벤트 이름은 joinRoom이야, 인자는 상황에 맞게 받어
  socket.on('joinRoom', (msg) => {
    console.log(`${msg.room}에 ${msg.name}이 가입함`);
    socket.emit('joinRoom', msg);
  });

  //채팅을 주고 받는 이벤트는 chat message야, 인자는 상황에 맞게 받어
  socket.on('chat message', (msg) => {
    const commentList = [...msg.commentList, msg.comment];
    mainNamespace.emit('chat message', commentList);
  });

  //연결을 끝는 이벤트는 기본으로 disconnect로 되어있다.
  socket.on('disconnect', () => {});
});

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
