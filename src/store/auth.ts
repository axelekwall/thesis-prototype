import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase';

export interface AuthState {
  user: User | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
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

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess,
    authReset,
  },
});

export const { actions, reducer } = auth;

export default reducer;
