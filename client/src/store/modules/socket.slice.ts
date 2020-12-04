/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';
import { Socket } from '@/store/sagas/socketSaga';

interface SocketState {
  socket: any;
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
    sendMessageRequest(state, { payload }: PayloadAction<{ message: string }>) {},
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
} = socketSlice.actions;

export default socketSlice.reducer;
