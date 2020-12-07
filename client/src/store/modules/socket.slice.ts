/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';
import { Socket } from '@/store/sagas/socketSaga';
import { RoomEvent, SocketEvent } from '@/types';

interface SocketState {
  socket: Socket | null;
}

const socketState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState: socketState,
  reducers: {
    socketConnectRequest() {},
    socketConnectSuccess(state, { payload }: PayloadAction<{ socket: Socket }>) {
      state.socket = payload.socket;
    },
    socketConnectFailure(state, { payload }: PayloadAction<{ err: Error }>) {
      console.error('socket connection failure', payload.err);
    },
    sendMessageRequest(state, { payload }: PayloadAction<SocketEvent>) {},
    socketDisconnectRequest() {},
    enterRoomRequest(state, { payload }: PayloadAction<RoomEvent>) {},
    leaveRoomRequest(state, { payload }: PayloadAction<RoomEvent>) {},
  },
});

const selectsocketState = (state: RootState) => state.socket;

export const selectsocket = createSelector(selectsocketState, (socket) => socket);
export const SOCKET = socketSlice.name;
export const {
  socketConnectRequest,
  socketConnectSuccess,
  socketConnectFailure,
  sendMessageRequest,
  socketDisconnectRequest,
  enterRoomRequest,
  leaveRoomRequest,
} = socketSlice.actions;

export default socketSlice.reducer;
