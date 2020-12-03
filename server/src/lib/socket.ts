import SocketIO, { Socket } from 'socket.io';
import http from 'http';
import { SOCKET_EVENT_TYPE } from '@/utils/constants';

const { CONNECT, MESSAGE, ENTER_ROOM, LEAVE_ROOM, DISCONNECT } = SOCKET_EVENT_TYPE;

export const bindSocketServer = (server: http.Server): void => {
  const io = new SocketIO.Server(server, {
    transports: ['websocket', 'polling'],
    cors: { origin: '*' },
  });

  const mainChannel = io.of('/');

  mainChannel.on(CONNECT, (socket: Socket) => {
    console.log('메인 채널 연결됨 socketID : ', socket.id);
    io.to(socket.id).emit(MESSAGE, { socketId: socket.id });

    socket.on(MESSAGE, (data) => {
      console.log('channel 1 메시지', data);
      if (data.target) {
        mainChannel.to(data.target).emit(MESSAGE, data.message);
        return;
      }
      mainChannel.emit(MESSAGE, data.message);
    });

    socket.on(ENTER_ROOM, (data) => {
      console.log(`enter room ${data}`);
      socket.join(data);
      console.log(socket.rooms);
    });

    socket.on(LEAVE_ROOM, (data) => {
      console.log(`leave room ${data}`);
      socket.leave(data);
      console.log(socket.rooms);
    });

    socket.on(DISCONNECT, () => {
      console.log('연결 끊김, 바이');
    });
  });
};
