import { createReducer } from '@reduxjs/toolkit';

import * as actions from './actions';

import type { AuthState } from './types';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.signInRequest, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(actions.signInSuccess, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(actions.signInFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase(actions.logoutSuccess, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    })
    .addCase(actions.resetError, (state) => {
      state.error = null;
    });
});
