import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  initialized: false,
};

const authSuccess: CaseReducer<AuthState, PayloadAction<User | null>> = (
  state,
  { payload }
) => {
  state.user = payload;
  state.initialized = true;
};

const authReset: CaseReducer<AuthState> = (state) => {
  state.user = null;
  state.initialized = true;
};

const setToken: CaseReducer<AuthState, PayloadAction<string>> = (
  state,
  { payload }
) => {
  state.token = payload;
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess,
    authReset,
    setToken,
  },
});

export const { actions, reducer } = auth;

export default reducer;
