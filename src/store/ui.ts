import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { DebtItem } from './data';
import { FileNode } from '../data';

const initialState: UiState = {
  focusedItem: null,
  focusedFile: null,
  selectedFile: null,
  selectedItem: null,
  newItem: false,
};

export interface UiState {
  focusedItem: DebtItem | null;
  focusedFile: FileNode | null;
  selectedItem: DebtItem | null;
  selectedFile: FileNode | null;
  newItem: boolean;
}

const itemfocused: CaseReducer<UiState, PayloadAction<DebtItem | null>> = (
  state,
  { payload }
) => {
  state.focusedItem = payload;
};
const fileFocused: CaseReducer<UiState, PayloadAction<FileNode | null>> = (
  state,
  { payload }
) => {
  state.focusedFile = payload;
};

const toggleNewItem: CaseReducer<UiState, PayloadAction<boolean>> = (
  state,
  { payload }
) => {
  state.newItem = payload;
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
    fileFocused,
    fileSelected,
    itemSelected,
    toggleNewItem,
    reset: (): UiState => initialState,
  },
});

export const { actions, reducer } = ui;

export default ui.reducer;
