import { combineReducers } from 'redux';
import channelSlice, { CHANNELS } from './channels';
import authSlice, { AUTH } from './auth';
import threadSlice, { THREAD } from './thread';
import userSlice, { USER } from './user';

const rootReducer = combineReducers({
  [CHANNELS]: channelSlice,
  [AUTH]: authSlice,
  [THREAD]: threadSlice,
  [USER]: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
