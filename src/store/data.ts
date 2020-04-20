import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { FileNode } from '../data';
import initialItems from '../data/initialItems';

type DebtTypes = 'Documentation' | 'Code' | 'Architecture';

export interface DebtItem {
  path: string;
  deadline: string;
  description: string;
  type: DebtTypes;
}

export interface DataState {
  repo: Array<FileNode>;
  items: Array<DebtItem>;
}

const initialState: DataState = {
  repo: [],
  items: initialItems,
};

const repoDataUpdated: CaseReducer<
  DataState,
  PayloadAction<Array<FileNode>>
> = (state, { payload }) => {
  state.repo = payload;
};

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    repoDataUpdated,
  },
});

export const { actions, reducer } = data;

export default reducer;
