import { createAction } from '@reduxjs/toolkit';

import { User } from '../../api/auth.ts';

import { SignInCredentials } from './types';

export const signInRequest = createAction<SignInCredentials>('auth/signInRequest');
export const signInSuccess = createAction<User>('auth/signInSuccess');
export const signInFailure = createAction<string>('auth/signInFailure');

export const logoutRequest = createAction('auth/logoutRequest');
export const logoutSuccess = createAction('auth/logoutSuccess');

export const resetError = createAction('auth/resetError');
