import SocketIO, { Socket } from 'socket.io';
import http from 'http';

const SOCKET_EVENT_TYPE = {
  CONNECTION: 'CONNECTION',
  DISCONNECT: 'DISCONNECT',
  MESSAGE: 'MESSAGE',
  ENTER_ROOM: 'ENTER_ROOM',
  LEAVE_ROOM: 'LEAVE_ROOM',
};

export const bindSocketServer = (server: http.Server): void => {
  const io = new SocketIO.Server(server, {
    transports: ['websocket', 'polling'],
    cors: { origin: '*' },
  });

  const mainChannel = io.of('/');

  mainChannel.on(SOCKET_EVENT_TYPE.CONNECTION, (socket: Socket) => {
    console.log('메인 채널됨 socketID : ', socket.id);
    io.to(socket.id).emit(SOCKET_EVENT_TYPE.MESSAGE, { socketId: socket.id });

    socket.on(SOCKET_EVENT_TYPE.MESSAGE, (data) => {
      console.log('channel 1 메시지', data);
      if (data.target) {
        mainChannel.to(data.target).emit(SOCKET_EVENT_TYPE.MESSAGE, data.message);
        return;
      }
      mainChannel.emit(SOCKET_EVENT_TYPE.MESSAGE, data.message);
    });

    socket.on(SOCKET_EVENT_TYPE.ENTER_ROOM, (data) => {
      console.log(`enter room ${data}`);
      socket.join(data);
      console.log(socket.rooms);
    });

    socket.on(SOCKET_EVENT_TYPE.LEAVE_ROOM, (data) => {
      console.log(`leave room ${data}`);
      socket.leave(data);
      console.log(socket.rooms);
    });

    socket.on(SOCKET_EVENT_TYPE.DISCONNECT, () => {
      console.log('연결 끊김, 바이');
    });
  });
};
