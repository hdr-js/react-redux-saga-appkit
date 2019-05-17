import { call, put } from 'redux-saga/effects';
import { actions as staffActions } from '../ducks/login';

export const getErrorMessage = error => {
  if (error.showUser === true) {
    return error.message;
  }
  return 'Server is down/restarting, Please contact System Admin for support.';
};

function* handleApiCall(apiCall, successAction, failureAction, runBeforeCompletion) {
  try {
    let response;
    try {
      response = yield apiCall;
      if (runBeforeCompletion !== undefined) {
        yield call(runBeforeCompletion, response);
      }
      if (response && response.Status === 'ValidationError') {
        yield put(failureAction(response));
      } else {
        yield put(successAction(response));
      }
    } catch (error) {
      if (error.res && error.res.code === 401) {
        try {
          yield put(staffActions.logout());
        } catch (err) {
          yield put(staffActions.logout());
        }
      } else {
        throw error;
      }
    }
  } catch (error) {
    if (error.res && error.res.status === 401) {
      try {
        yield put(staffActions.logout());
      } catch (err) {
        yield put(staffActions.logout());
      }
    }
    yield put(failureAction(getErrorMessage(error)));
  }
}

export const callApi = (...args) => call(handleApiCall, ...args);
