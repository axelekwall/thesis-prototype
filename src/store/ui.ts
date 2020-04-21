import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { DebtItem } from './data';
import { FileNode } from '../data';

const initialState: UiState = {
  focusedItem: null,
  selectedFile: null,
  selectedItem: null,
};

export interface UiState {
  focusedItem: DebtItem | null;
  selectedItem: DebtItem | null;
  selectedFile: FileNode | null;
}

const itemfocused: CaseReducer<UiState, PayloadAction<DebtItem | null>> = (
  state,
  { payload }
) => {
  state.focusedItem = payload;
};

const itemSelected: CaseReducer<UiState, PayloadAction<DebtItem | null>> = (
  state,
  { payload }
) => {
  state.selectedItem = state.selectedItem?.id === payload?.id ? null : payload;
};

const fileSelected: CaseReducer<UiState, PayloadAction<FileNode | null>> = (
  state,
  { payload }
) => {
  state.selectedFile =
    state.selectedFile?.path === payload?.path ? null : payload;
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    itemfocused,
    fileSelected,
    itemSelected,
  },
});

export const { actions, reducer } = ui;

export default ui.reducer;
