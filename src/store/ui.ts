import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  menuOpen: false,
};

type UiState = typeof initialState;

const menuToggled: CaseReducer<UiState, PayloadAction<boolean>> = (
  state,
  { payload }
) => {
  state.menuOpen = payload;
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    menuToggled,
  },
});

export const { actions, reducer } = ui;

export default ui.reducer;
