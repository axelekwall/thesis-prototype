import React, { FC } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { FileNode } from '../data';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { DataState } from '../store/data';

const TreeMap: FC = () => {
  const { repo, items } = useSelector<State, DataState>((state) => state.data);
  return (
    <ResponsiveTreeMap
      root={{
        path: '/',
        type: 'tree',
        children: repo,
      }}
      tile="sliceDice"
      identity="path"
      value={(node: FileNode): number => {
        return node.type === 'tree'
          ? 0
          : items.filter((item) => item.path === node.path).length + 1;
      }}
      innerPadding={5}
      outerPadding={5}
      label={(node: FileNode): string => node.pathArray[node.level]}
      onClick={(event: any): void => console.log(event)}
    />
  );
};
export default TreeMap;
