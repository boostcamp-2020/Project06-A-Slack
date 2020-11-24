import { all, call } from 'redux-saga/effects';
import channels from './channels';

export default function* rootSaga() {
  yield all([call(channels), console.log('hi')]);
}
