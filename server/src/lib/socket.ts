import SocketIO, { Socket } from 'socket.io';
import http from 'http';
import { SOCKET_EVENT_TYPE } from '@/utils/constants';
import { threadModel, channelModel } from '@/models';

const { CONNECT, MESSAGE, ENTER_ROOM, LEAVE_ROOM, DISCONNECT } = SOCKET_EVENT_TYPE;

interface Room {
  room: string;
}

interface Emoji {
  name: string;
  userId: number;
}
interface Message {
  id: number;
  userId: number;
  channelId: number;
  parentId: number | null;
  content: string;
  url: string;
  isEdited: number;
  isPinned: number;
  createdAt: string;
  emoji: Emoji[] | null;
  subCount: number;
  subThreadUserId1: number | null;
  subThreadUserId2: number | null;
  subThreadUserId3: number | null;
  email: string;
  displayName: string;
  phoneNumber: string | null;
  image: string;
}

export const bindSocketServer = (server: http.Server): void => {
  const io = new SocketIO.Server(server, {
    transports: ['websocket', 'polling'],
    cors: { origin: '*' },
  });

  const namespace = io.of('/');

  namespace.on(CONNECT, (socket: Socket) => {
    console.log('메인 채널 연결됨 socketID : ', socket.id);
    // io.to(socket.id).emit(MESSAGE, { socketId: socket.id });

    /* TODO 1: 새로 생성한 채널/DM에 대한 이벤트도 전달해야함 */

    socket.on(MESSAGE, async (data: { message: Message; room: string }) => {
      console.log('메시지', data);

      /* TODO 2: ROOM 구분해서 전송 */
      /* TODO 3: model 접근해서 쿼리 날리고 성공 시 emit */

      // await threadModel.createThread()

      namespace.emit(MESSAGE, data);
    });

    socket.on(ENTER_ROOM, (data: Room) => {
      console.log(`enter room ${data.room}`);
      socket.join(data.room);
      console.log(socket.rooms);
    });

    socket.on(LEAVE_ROOM, (data: Room) => {
      console.log(`leave room ${data.room}`);
      socket.leave(data.room);
      console.log(socket.rooms);
    });

    socket.on(DISCONNECT, () => {
      console.log('연결 끊김, 바이');
    });
  });
};
