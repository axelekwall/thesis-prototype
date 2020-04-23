import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { FileNode } from '../data';
import initialItems from '../data/initialItems';

export type DebtTypes =
  | 'Documentation'
  | 'Code'
  | 'Architectural'
  | 'Environmental'
  | 'Testing';
export type Priority = 1 | 2 | 3;
export type Estimate = 1 | 2 | 3 | 5 | 8;

export interface DebtItem {
  path: string;
  deadline: number;
  created: number;
  completed?: number;
  priority: Priority;
  estimate: Estimate;
  description: string;
  type: DebtTypes;
  id: string;
  title: string;
}

export interface DataState {
  repo: Array<FileNode>;
  repoTree: Array<FileNode>;
  items: Array<DebtItem>;
  levels: number;
}

const initialState: DataState = {
  repo: [],
  repoTree: [],
  items: initialItems,
  levels: 0,
};

const repoDataUpdated: CaseReducer<
  DataState,
  PayloadAction<{ data: Array<FileNode>; repoTree: Array<FileNode> }>
> = (state, { payload }) => {
  state.levels = payload.repoTree.reduce(
    (prev, { level }) => (prev > level ? prev : level),
    1
  );
  state.repo = payload.data;
  state.repoTree = payload.repoTree;
};

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    repoDataUpdated,
    reset: (state): DataState => state,
  },
});

export const { actions, reducer } = data;

export default reducer;
