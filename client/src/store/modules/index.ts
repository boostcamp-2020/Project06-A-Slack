import { combineReducers } from 'redux';
import channelSlice, { CHANNEL } from './channel';
import authSlice, { AUTH } from './auth';
import threadSlice, { THREAD } from './thread';

const rootReducer = combineReducers({
  [CHANNEL]: channelSlice,
  [AUTH]: authSlice,
  [THREAD]: threadSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
