import { combineReducers } from 'redux';
import channelSlice, { CHANNELS } from './channels';
import authSlice, { AUTH } from './auth';
import threadSlice, { THREAD } from './thread';
import subThreadSlice, { SUBTHREAD } from './subThread';

const rootReducer = combineReducers({
  [CHANNELS]: channelSlice,
  [AUTH]: authSlice,
  [THREAD]: threadSlice,
  [SUBTHREAD]: subThreadSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
