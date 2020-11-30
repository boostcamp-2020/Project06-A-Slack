import { combineReducers } from 'redux';
import channelSlice, { CHANNEL } from './channel';
import authSlice, { AUTH } from './auth';
import threadSlice, { THREAD } from './thread';
import subThreadSlice, { SUBTHREAD } from './subThread';
import userSlice, { USER } from './user';
import signupSlice, { SIGNUP } from './signup';

const rootReducer = combineReducers({
  [CHANNEL]: channelSlice,
  [AUTH]: authSlice,
  [THREAD]: threadSlice,
  [SUBTHREAD]: subThreadSlice,
  [USER]: userSlice,
  [SIGNUP]: signupSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
