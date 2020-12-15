import { put, all, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import {
  socketConnectRequest,
  socketConnectSuccess,
  socketConnectFailure,
  sendMessageRequest,
  socketDisconnectRequest,
  enterRoomRequest,
  leaveRoomRequest,
} from '@/store/modules/socket.slice';
import {
  addThread,
  changeEmojiOfThread,
  updateAddSubThreadInfo,
  deleteThread,
  updateDeleteSubThreadInfo,
} from '@/store/modules/thread.slice';
import {
  changeEmojiOfSubThread,
  addSubThread,
  deleteSubThread,
  deleteSubParentThread,
} from '@/store/modules/subThread.slice';

import {
  updateChannelUnread,
  updateChannelTopic,
  updateChannelUsers,
  setReloadMyChannelListFlag,
} from '@/store/modules/channel.slice';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { SOCKET_EVENT_TYPE, CHANNEL_SUBTYPE, THREAD_SUBTYPE } from '@/utils/constants';
import {
  SocketEvent,
  isChannelEvent,
  isDMEvent,
  isEmojiEvent,
  isThreadEvent,
  isUserEvent,
  Channel,
  JoinedUser,
  Thread,
  EmojiOfThread,
} from '@/types';

const { CONNECT, MESSAGE, ENTER_ROOM, LEAVE_ROOM, DISCONNECT } = SOCKET_EVENT_TYPE;

export type Socket = SocketIOClient.Socket;

function connectSocket(): Promise<Socket> {
  const socket = io(`${process.env.BASE_URL as string}`, {
    transports: ['websocket', 'polling'],
  });
  return new Promise((resolve) => {
    socket.on(CONNECT, () => {
      console.log('connect');
      resolve(socket);
    });
  });
}

function subscribeSocket(socket: Socket) {
  return eventChannel((emit: any) => {
    const handleMessage = (data: SocketEvent) => {
      if (isThreadEvent(data)) {
        // TODO 1: room에 해당하는 채널/DM에 new message가 생겼다는 action 전송(해당 사가에서 flag ON)
        const { type, subType, room, thread } = data;
        if (subType === THREAD_SUBTYPE.CREATE_THREAD) {
          if (thread.parentId) {
            if (thread.id && thread.emoji && thread.createdAt) {
              emit(
                addSubThread({
                  thread: {
                    ...thread,
                    id: thread.id,
                    createdAt: thread.createdAt,
                    emoji: thread.emoji,
                  },
                }),
              );
              emit(
                updateAddSubThreadInfo({
                  threadId: thread.parentId,
                  subThreadUserId: thread.userId,
                }),
              );
            }
            return;
          }
          emit(addThread({ thread }));
          return;
        }
        if (subType === THREAD_SUBTYPE.DELETE_THREAD) {
          const { parentThread } = data;
          if (thread.id) {
            if (thread.parentId !== null) {
              if (thread.emoji && thread.createdAt) {
                emit(
                  deleteSubThread({
                    thread: {
                      ...thread,
                      id: thread.id,
                      createdAt: thread.createdAt,
                      emoji: thread.emoji,
                    },
                  }),
                );
              }
              if (parentThread && parentThread.id && parentThread.emoji && parentThread.createdAt) {
                emit(
                  updateDeleteSubThreadInfo({
                    thread: {
                      ...parentThread,
                      id: parentThread.id,
                      createdAt: parentThread.createdAt,
                      emoji: parentThread.emoji,
                    },
                  }),
                );
              }
            }
            emit(deleteThread({ threadId: thread.id }));
            emit(deleteSubParentThread({ threadId: thread.id }));
          }
        }
      }
      if (isEmojiEvent(data)) {
        const { room, emoji, threadId, type } = data;
        if (emoji && threadId) {
          emit(changeEmojiOfThread({ emoji, threadId }));
          emit(changeEmojiOfSubThread({ emoji, threadId }));
        }
        return;
      }
      if (isUserEvent(data)) {
        // TODO: User 이벤트 처리
        return;
      }
      if (isChannelEvent(data)) {
        const { room, channel, subType, type, users } = data;

        if (subType === CHANNEL_SUBTYPE.UPDATE_CHANNEL_UNREAD) {
          emit(updateChannelUnread({ channel: data.channel as Channel }));
          return;
        }

        if (subType === CHANNEL_SUBTYPE.UPDATE_CHANNEL_TOPIC) {
          emit(updateChannelTopic({ channel: data.channel as Channel }));
          return;
        }

        if (subType === CHANNEL_SUBTYPE.UPDATE_CHANNEL_USERS) {
          emit(updateChannelUsers({ users: users as JoinedUser[], channel: channel as Channel }));
          return;
        }

        if (
          subType === CHANNEL_SUBTYPE.MAKE_DM ||
          subType === CHANNEL_SUBTYPE.FIND_AND_JOIN_CHANNEL
        ) {
          emit(setReloadMyChannelListFlag({ reloadMyChannelList: true }));
        }

        return;
      }
      if (isDMEvent(data)) {
        // TODO: DM 이벤트 처리
      }
    };

    const handleDisconnect = (data: any) => {
      // TODO: 서버로부터 연결이 끊겼을 때의 처리
      console.log('disconnected from server');
    };

    socket.on(MESSAGE, handleMessage);
    socket.on(DISCONNECT, handleDisconnect);
    return () => {
      socket.off(MESSAGE, handleMessage);
      socket.off(DISCONNECT, handleDisconnect);
    };
  });
}

function* read(socket: Socket) {
  const channel = yield call(subscribeSocket, socket);
  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* write(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendMessageRequest);
    socket.emit(MESSAGE, payload);
  }
}

function* enterRoom(socket: Socket) {
  while (true) {
    const { payload } = yield take(enterRoomRequest);
    socket.emit(ENTER_ROOM, payload);
  }
}

function* leaveRoom(socket: Socket) {
  while (true) {
    const { payload } = yield take(leaveRoomRequest);
    socket.emit(LEAVE_ROOM, payload);
  }
}

function* handleIO(socket: Socket) {
  yield fork(read, socket);
  yield fork(write, socket);
  yield fork(enterRoom, socket);
  yield fork(leaveRoom, socket);
}

function* socketFlow() {
  while (true) {
    yield take(socketConnectRequest);
    try {
      const socket = yield call(connectSocket);
      yield put(socketConnectSuccess({ socket }));
      const socketTask = yield fork(handleIO, socket);

      yield take(socketDisconnectRequest);
      yield cancel(socketTask);
      socket.close();
    } catch (err) {
      yield put(socketConnectFailure({ err }));
    }
  }
}

export default function* socketSaga() {
  yield fork(socketFlow);
}
