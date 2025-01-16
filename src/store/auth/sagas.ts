import { call, put, takeLatest, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { signIn } from '../../api/auth';

import * as actions from './actions';

import type { SignInCredentials } from './types';

function* setAuthToken(token: string) {
  yield call([localStorage, 'setItem'], 'token', token);
}

function* removeAuthToken() {
  yield call([localStorage, 'removeItem'], 'token');
}

function* logError(error: unknown) {
  yield call(console.error, 'Auth error:', error);
}

function* handleSignIn(action: PayloadAction<SignInCredentials>) {
  try {
    const response: Awaited<ReturnType<typeof signIn>> = yield call(signIn, action.payload);

    yield call(setAuthToken, response.token);

    yield put(actions.signInSuccess(response.user));
  } catch (error) {
    yield call(logError, error);

    if (error instanceof Error) {
      yield put(actions.signInFailure(error.message));
    } else {
      yield put(actions.signInFailure('An unknown error occurred'));
    }
  }
}

function* handleLogout() {
  try {
    yield call(removeAuthToken);

    yield put(actions.logoutSuccess());
  } catch (error) {
    yield call(logError, error);
  }
}

function* checkInitialAuth() {
  try {
    const token: string | null = yield call([localStorage, 'getItem'], 'token');

    if (token) {
      // could init user here
      // yield put(actions.initializeAuthSuccess());
    }
  } catch (error) {
    yield call(logError, error);
  }
}

export function* authSaga() {
  yield all([
    takeLatest(actions.signInRequest.type, handleSignIn),
    takeLatest(actions.logoutRequest.type, handleLogout),
    call(checkInitialAuth),
  ]);
}
