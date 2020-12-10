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
import { addThread, updateSubThreadInfo } from '@/store/modules/thread.slice';
import { addSubThread } from '@/store/modules/subThread.slice';
import {
  updateChannelUnread,
  updateChannelTopic,
  updateChannelUsers,
  setReloadMyChannelListFlag,
} from '@/store/modules/channel.slice';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { SOCKET_EVENT_TYPE, CHANNEL_SUBTYPE } from '@/utils/constants';
import {
  SocketEvent,
  isChannelEvent,
  isDMEvent,
  isEmojiEvent,
  isThreadEvent,
  isUserEvent,
  Channel,
  JoinedUser,
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
        const { room, thread, type } = data;
        if (thread.parentId) {
          emit(addSubThread({ thread }));
          emit(updateSubThreadInfo({ threadId: thread.parentId, subThreadUserId: thread.userId }));
          return;
        }
        emit(addThread({ thread }));
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

        if (subType === CHANNEL_SUBTYPE.MAKE_DM) {
          emit(setReloadMyChannelListFlag({ reloadMyChannelList: true }));
        }

        return;
      }
      if (isDMEvent(data)) {
        // TODO: DM 이벤트 처리
      }

      console.log('from server, message: ', data);
    };

    const handleDisconnect = (data: any) => {
      // TODO: 서버로부터 연결이 끊겼을 때의 처리
      console.log('disconnected');
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
