import { combineReducers } from 'redux';
import channelSlice, { CHANNEL } from './channel';
import authSlice, { AUTH } from './auth';
import threadSlice, { THREAD } from './thread';
import subThreadSlice, { SUBTHREAD } from './subThread';
import userSlice, { USER } from './user';
import signupSlice, { SIGNUP } from './signup';
import socketSlice, { SOCKET } from './socket';

const rootReducer = combineReducers({
  [CHANNEL]: channelSlice,
  [AUTH]: authSlice,
  [THREAD]: threadSlice,
  [SUBTHREAD]: subThreadSlice,
  [USER]: userSlice,
  [SIGNUP]: signupSlice,
  [SOCKET]: socketSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
