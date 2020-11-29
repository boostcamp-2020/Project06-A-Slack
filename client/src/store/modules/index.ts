import { combineReducers } from 'redux';
import channelSlice, { CHANNEL } from './channel';
import authSlice, { AUTH } from './auth';
import threadSlice, { THREAD } from './thread';
import userSlice, { USER } from './user';
import signupSlice, { SIGNUP } from './signup';

const rootReducer = combineReducers({
  [CHANNEL]: channelSlice,
  [AUTH]: authSlice,
  [THREAD]: threadSlice,
  [USER]: userSlice,
  [SIGNUP]: signupSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
