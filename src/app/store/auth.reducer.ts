import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isLoading: boolean;
  token: string | null;
  error: any;
}

const initialState: AuthState = {
  isLoading: false,
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading,
  })),
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
