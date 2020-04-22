import React, { FC, useCallback } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { FileNode } from '../data';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../store';
import { DataState, DebtItem, DebtTypes } from '../store/data';
import * as d3 from 'd3-scale-chromatic';
import { actions } from '../store/ui';

const TreeMap: FC = () => {
  const dispatch = useDispatch();
  const { repo, items, levels } = useSelector<State, DataState>(
    (state) => state.data
  );
  const focusedItem = useSelector<State, DebtItem | null>(
    (state) => state.ui.focusedItem
  );
  const getColorByType = useCallback(
    (type: DebtTypes) => {
      switch (type) {
        case 'Code':
          return 'yellow';
        case 'Documentation':
          return 'green';
        case 'Architectural':
          return 'orange';
        default:
          return 'orange';
      }
    },
    [items]
  );
  const itemClicked = useCallback(
    (d: { data: FileNode }) => {
      dispatch(actions.fileSelected(d.data));
    },
    [dispatch]
  );
  const getColorBasedOnLevel = useCallback(
    (level: number): string => d3.schemeBlues[levels + 1][level + 1],
    [levels]
  );
  const matchColors = useCallback(
    (d: FileNode): string => {
      if (focusedItem?.path === d.path) return 'red';
      const tmp = items.filter((item) => item.path === d.path);
      if (tmp.length > 1) return 'blue';
      if (tmp.length === 1) return getColorByType(tmp[0].type);
      return getColorBasedOnLevel(d.level);
    },
    [focusedItem, items]
  );
  return (
    <ResponsiveTreeMap
      root={{
        path: '/',
        type: 'tree',
        level: -1,
        children: repo,
      }}
      identity="path"
      value={(node: FileNode): number => {
        return node.type === 'tree'
          ? 0
          : items.filter((item) => item.path === node.path).length + 1;
      }}
      innerPadding={0}
      outerPadding={10}
      borderWidth={2}
      labelTextColor="black"
      borderColor={{ from: 'color', modifiers: [['darker', '0.3']] }}
      colors={matchColors}
      label={(node: FileNode): string => node.pathArray[node.level]}
      onClick={itemClicked}
    />
  );
};
export default TreeMap;
