import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { DebtItem } from './data';

const initialState: UiState = {
  focusedItem: null,
};

export interface UiState {
  focusedItem: DebtItem | null;
}

const itemfocused: CaseReducer<UiState, PayloadAction<DebtItem | null>> = (
  state,
  { payload }
) => {
  state.focusedItem = payload;
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    itemfocused,
  },
});

export const { actions, reducer } = ui;

export default ui.reducer;
