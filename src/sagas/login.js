import { call, takeLatest } from 'redux-saga/effects';

import { login, signup } from '../api/login';
import { callApi } from './utils';

import { types as staffTypes, actions as staffActions } from '../ducks/login';

function* staffLogin(action) {
  const { success, failure } = staffActions.saga.login;
  yield callApi(call(login, action.data), success, failure);
}

function* staffSignup(action) {
  const { success, failure } = staffActions.saga.signup;
  yield callApi(call(signup, action.data), success, failure);
}

export default function* rootStaffSaga() {
  yield takeLatest(staffTypes.login, staffLogin);
  yield takeLatest(staffTypes.signup, staffSignup);
}
