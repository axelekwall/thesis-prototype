import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { DebtItem } from './data';

const initialState: DebtItem = {
  path: '/',
  deadline: 0,
  created: 0,
  priority: 'Normal',
  description: '',
  id: '',
  title: '',
  type: 'Architectural',
};

const fieldUpdated: CaseReducer<DebtItem, PayloadAction<DebtItem>> = (
  _,
  { payload }
) => {
  return payload;
};

const editItem = createSlice({
  name: 'editItem',
  initialState,
  reducers: {
    fieldUpdated,
    reset: (): DebtItem => initialState,
  },
});

export const { actions, reducer } = editItem;

export default editItem.reducer;
