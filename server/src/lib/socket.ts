import SocketIO, { Socket } from 'socket.io';
import http from 'http';
import { SOCKET_EVENT_TYPE, SOCKET_MESSAGE_TYPE } from '@/utils/constants';
import { threadModel, channelModel } from '@/models';
import { threadService } from '@/services';

const { CONNECT, MESSAGE, ENTER_ROOM, LEAVE_ROOM, DISCONNECT } = SOCKET_EVENT_TYPE;

/* 소켓으로 처리할 이벤트

1. 스레드 
  - 생성
  - 수정
  - 삭제

2. 이모티콘
  - 클릭
  - 해제

3. 유저정보 변경

4. 채널
  - 유저 추가/삭제
  - 토픽 변경
  - 핀

5. DM
  - 새로운 DM 왔을 때 

*/

/* 각 이벤트별 타입

  type: thread
  room: string
  thread: {스레드 객체}

  type: emoji
  room: string
  emoji: {이모지 객체}

  type: user
  user: {유저 객체}

  type: channel
  channel: {채널 객체}

  type: dm
  dm: {dm 객체}

*/

interface Emoji {
  name: string;
  userId: number;
}
interface Thread {
  id?: number; // 스레드 추가 요청 이벤트에는 id가 없음
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

interface User {
  id: number;
  email: string;
  displayName: string;
  phoneNumber: string | null;
  image: string;
  lastChannelId?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

interface JoinedUser {
  userId: number;
  displayName: string;
  image: string;
}

interface Channel {
  id: number;
  ownerId: number;
  name: string;
  channelType: number;
  topic: string;
  isPublic: number;
  memberCount: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  users?: User[];
  joinedUsers?: JoinedUser[];
  isUpdateUsers: boolean;
  unreadMessage?: boolean;
}

type DM = Channel;

interface ThreadEvent {
  type: string;
  room: string;
  thread: Thread;
}

interface EmojiEvent {
  type: string;
  room: string;
  emoji: Emoji; // TODO: 추후 타입 다시 결정
}

interface UserEvent {
  type: string;
  user: User;
}

interface ChannelEvent {
  type: string;
  channel: Channel;
  room: string;
}

interface DMEvent {
  type: string;
  dm: DM;
}

interface RoomEvent {
  room: string;
}

type SocketEvent = ThreadEvent | EmojiEvent | UserEvent | ChannelEvent | DMEvent | RoomEvent;

const isThreadEvent = (event: SocketEvent): event is ThreadEvent => {
  return (event as ThreadEvent).type === SOCKET_MESSAGE_TYPE.THREAD;
};

const isEmojiEvent = (event: SocketEvent): event is EmojiEvent => {
  return (event as EmojiEvent).type === SOCKET_MESSAGE_TYPE.EMOJI;
};

const isUserEvent = (event: SocketEvent): event is UserEvent => {
  return (event as UserEvent).type === SOCKET_MESSAGE_TYPE.USER;
};

const isChannelEvent = (event: SocketEvent): event is ChannelEvent => {
  return (event as ChannelEvent).type === SOCKET_MESSAGE_TYPE.CHANNEL;
};

const isDMEvent = (event: SocketEvent): event is DMEvent => {
  return (event as DMEvent).type === SOCKET_MESSAGE_TYPE.DM;
};

const isRoomEvent = (event: SocketEvent): event is RoomEvent => {
  return (event as RoomEvent).room !== undefined;
};

export const bindSocketServer = (server: http.Server): void => {
  const io = new SocketIO.Server(server, {
    transports: ['websocket', 'polling'],
    cors: { origin: '*' },
  });

  const namespace = io.of('/');

  namespace.on(CONNECT, (socket: Socket) => {
    console.log('메인 채널 연결됨 socketID : ', socket.id);
    // io.to(socket.id).emit(MESSAGE, { socketId: socket.id });

    socket.on(MESSAGE, async (data: SocketEvent) => {
      if (isThreadEvent(data)) {
        /* TODO 1: 새로 생성한 채널/DM에 대한 이벤트도 전달해야함 */

        const { room, thread, type } = data;
        const { userId, channelId, content, parentId } = thread;
        const insertId = await threadService.createThread({ userId, channelId, content, parentId });

        namespace.to(room).emit(MESSAGE, { type, thread: { ...thread, id: insertId }, room });
        namespace.emit(MESSAGE, {
          type: SOCKET_MESSAGE_TYPE.CHANNEL,
          channel: { id: thread.channelId, unreadMessage: true },
          room,
        });
        return;
      }
      if (isEmojiEvent(data)) {
        // TODO: Emoji 이벤트 처리
        return;
      }
      if (isUserEvent(data)) {
        // TODO: User 이벤트 처리
        return;
      }
      if (isChannelEvent(data)) {
        // TODO: Channel 이벤트 처리
        const { room, channel, type } = data;
        const { id, topic, users, memberCount, isUpdateUsers } = channel;

        if (id) {
          if (isUpdateUsers && users) {
            try {
              const joinUsers: [number[]] = users.reduce((acc: any, cur: User) => {
                acc.push([cur.id, id]);
                return acc;
              }, []);

              await channelModel.joinChannel({
                joinUsers,
                joinedNumber: memberCount,
                channelId: id,
              });
              const [joinedUsers] = await channelModel.getChannelUser({ channelId: +id });

              namespace.emit(MESSAGE, { type, channel: { ...channel, joinedUsers }, room });
            } catch (err) {
              console.log(err);
            }
          } else {
            try {
              await channelModel.modifyTopic({ channelId: id, topic });
              namespace.to(room).emit(MESSAGE, { type, channel, room });
            } catch (err) {
              console.log(err);
            }
          }
        }

        return;
      }
      if (isDMEvent(data)) {
        // TODO: DM방 만드는 이벤트 처리
      }
    });

    socket.on(ENTER_ROOM, (data: RoomEvent) => {
      console.log('enter');
      console.dir(data, { depth: null });
      socket.join(data.room);
    });

    socket.on(LEAVE_ROOM, (data: RoomEvent) => {
      console.log('leave');
      console.dir(data, { depth: null });
      socket.leave(data.room);
    });

    socket.on(DISCONNECT, () => {
      console.log('연결 끊김, 바이');
    });
  });
};
