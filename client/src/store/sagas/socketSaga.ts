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
    const handleMessage = (data: any) => {
      // TODO: handle message
      console.log('from server, message: ', data);
      emit(addThread({ thread: data.thread }));
    };

    const handleDisconnect = (data: any) => {
      // TODO: handle server disconnect
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
