import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { DebtItem } from './data';

const initialState: NewItemState = {
  path: '/',
  deadline: 0,
  created: 0,
  priority: 1,
  estimate: 1,
  id: '1',
  title: '',
  type: 'Architectural',
};

export interface NewItemState extends DebtItem {}

const fieldUpdated: CaseReducer<NewItemState, PayloadAction<NewItemState>> = (
  _,
  { payload }
) => {
  return payload;
};

const ui = createSlice({
  name: 'newItem',
  initialState,
  reducers: {
    fieldUpdated,
    reset: (): NewItemState => initialState,
  },
});

export const { actions, reducer } = ui;

export default ui.reducer;
