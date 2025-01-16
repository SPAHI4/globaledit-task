import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../types';

const selectAuthDomain = (state: RootState) => state.auth;

export const selectAuthState = createSelector([selectAuthDomain], (auth) => ({
  user: auth.user,
  isAuthenticated: auth.isAuthenticated,
  isLoading: auth.isLoading,
  error: auth.error,
}));

export const selectUser = createSelector([selectAuthDomain], (auth) => auth.user);

export const selectIsAuthenticated = createSelector([selectAuthDomain], (auth) => auth.isAuthenticated);
