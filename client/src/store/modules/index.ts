import { combineReducers } from 'redux';
import channelSlice, { CHANNEL } from './channel.slice';
import authSlice, { AUTH } from './auth.slice';
import threadSlice, { THREAD } from './thread.slice';
import subThreadSlice, { SUBTHREAD } from './subThread.slice';
import userSlice, { USER } from './user.slice';
import signupSlice, { SIGNUP } from './signup.slice';
import socketSlice, { SOCKET } from './socket.slice';
import emojiSlice, { EMOJI } from './emoji.slice';

const rootReducer = combineReducers({
  [CHANNEL]: channelSlice,
  [AUTH]: authSlice,
  [THREAD]: threadSlice,
  [SUBTHREAD]: subThreadSlice,
  [USER]: userSlice,
  [SIGNUP]: signupSlice,
  [SOCKET]: socketSlice,
  [EMOJI]: emojiSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
