import { combineReducers } from 'redux';
import channelSlice, { CHANNELS } from './channels';
import authSlice, { AUTH } from './auth';

const rootReducer = combineReducers({
  [CHANNELS]: channelSlice,
  [AUTH]: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
