import SocketIO, { Socket } from 'socket.io';
import http from 'http';
import {
  SOCKET_EVENT_TYPE,
  SOCKET_MESSAGE_TYPE,
  GET_THREAD_SQL,
  UPDATE_EMOJIES_OF_THREAD_SQL,
  ERROR_MESSAGE,
} from '@/utils/constants';
import { threadModel, channelModel } from '@/models';
import { threadService } from '@/services';
import pool from '@/db';

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

interface EmojiOfThread {
  id: number;
  userList: number[];
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
  emoji: EmojiOfThread[] | null;
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
  phoneNumber: string;
  image: string;
  isDeleted: number;
  lastChannelId?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

interface Channel {
  id: number;
  ownerId: number;
  name: string;
  channelType: number;
  topic: string;
  isPublic: number;
  isDeleted: number;
  memberCount: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
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
  emoji?: EmojiOfThread[];
  emojiId?: number;
  userId?: number;
  threadId?: number;
}

interface UserEvent {
  type: string;
  user: User;
}

interface ChannelEvent {
  type: string;
  channel: Channel;
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
        return;
      }

      if (isEmojiEvent(data)) {
        const { type, emojiId, userId, threadId, room } = data;

        if (!(type && emojiId && userId && threadId && room)) {
          console.log(ERROR_MESSAGE.MISSING_REQUIRED_VALUES);
          // valid 코드 추가 (1. emojiId, userId, threadId가 실제로 존재하는지?)
          return;
        }

        const conn = await pool.getConnection();
        try {
          await conn.beginTransaction();

          const [[thread]]: any[] = await conn.execute(GET_THREAD_SQL, [threadId]);
          const emojisOfThread: EmojiOfThread[] = thread.emoji;

          const emojiIdx = emojisOfThread.findIndex(
            (emojiOfThread: EmojiOfThread) => Number(emojiOfThread.id) === Number(emojiId),
          );

          // 현재 emoji가 없는 경우 + 전체 이모지가 없을때
          if (emojiIdx === -1) {
            emojisOfThread.concat({ id: Number(emojiId), userList: [userId] });
          }

          // emoji가 있는데, 해당 emoji의 userList에 userId가 있으면 유저 삭제, 없으면 유저 추가.
          if (emojiIdx !== -1 && emojisOfThread[emojiIdx]) {
            const targetUserList = emojisOfThread[emojiIdx].userList;
            const userIdx = targetUserList.findIndex((id: number) => Number(id) === Number(userId));

            // 유저가 있으면 삭제
            if (Number(userIdx) !== -1) {
              targetUserList.splice(userIdx, 1);
              if (targetUserList.length === 0) {
                emojisOfThread.splice(emojiIdx, 1);
              }
            }

            // 유저가 없으면 추가
            if (Number(userIdx) === -1) {
              const { userList } = emojisOfThread[emojiIdx];
              userList.push(Number(userId));
              const newEmojiState = { id: Number(emojiId), userList };
              emojisOfThread[emojiIdx] = newEmojiState;
            }
          }
          namespace.to(room).emit(MESSAGE, { type, emoji: emojisOfThread, threadId, room });

          const emojisOfThreadJson = JSON.stringify(emojisOfThread);
          const sql = conn.format(UPDATE_EMOJIES_OF_THREAD_SQL, [emojisOfThreadJson, threadId]);
          console.log(sql);
          await conn.execute(sql);
          await conn.commit();
        } catch (err) {
          console.error(err);
          conn.rollback();
        } finally {
          conn.release();
        }
        return;
      }
      if (isUserEvent(data)) {
        // TODO: User 이벤트 처리
        return;
      }
      if (isChannelEvent(data)) {
        // TODO: Channel 이벤트 처리
        return;
      }
      if (isDMEvent(data)) {
        // TODO: DM 이벤트 처리
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
