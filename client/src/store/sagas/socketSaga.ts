import { put, all, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import {
  socketConnectRequest,
  socketConnectSuccess,
  socketConnectFailure,
  sendMessageRequest,
  socketDisconnectRequest,
} from '@/store/modules/socket.slice';
import { addThread } from '@/store/modules/thread.slice';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { SOCKET_EVENT_TYPE } from '@/utils/constants';

const { CONNECT, MESSAGE, ENTER_ROOM, LEAVE_ROOM, DISCONNECT } = SOCKET_EVENT_TYPE;

export type Socket = SocketIOClient.Socket;

function connectSocket(): Promise<Socket> {
  const socket = io(`${process.env.BASE_URL as string}`);
  return new Promise((resolve) => {
    socket.on(CONNECT, () => {
      console.log('connect');
      resolve(socket);
    });
  });
}

function subscribeSocket(socket: Socket) {
  return eventChannel((emit: any) => {
    // TODO: 채널/DM 추가에 대한 이벤트 바인딩 OR 아래 message 이벤트에서 함께 처리

    const handleMessage = (data: any) => {
      // TODO 1: room에 해당하는 채널/DM에 new message가 생겼다는 action 전송(해당 사가에서 flag on)

      // TODO 2: thread에 메시지 추가
      emit(addThread({ thread: data.thread }));

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

function* handleIO(socket: Socket) {
  yield fork(read, socket);
  yield fork(write, socket);
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
