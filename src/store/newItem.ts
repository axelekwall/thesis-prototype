import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { DebtItem } from './data';

const initialState: DebtItem = {
  path: '/',
  deadline: new Date().valueOf(),
  created: 0,
  priority: 'Normal',
  description: '',
  id: '1',
  title: '',
  type: 'Architectural',
};

const fieldUpdated: CaseReducer<DebtItem, PayloadAction<DebtItem>> = (
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
    reset: (): DebtItem => initialState,
  },
});

export const { actions, reducer } = ui;

export default ui.reducer;
