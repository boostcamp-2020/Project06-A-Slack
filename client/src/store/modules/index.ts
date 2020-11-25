import { combineReducers } from 'redux';
import authSlice, { AUTH } from './auth';

const rootReducer = combineReducers({
  [AUTH]: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
