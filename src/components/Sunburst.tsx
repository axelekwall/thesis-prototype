import React, { FC } from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { DataState } from '../store/data';
import { FileNode } from '../data';

const Sunburst: FC = () => {
  const { repo, items } = useSelector<State, DataState>((state) => state.data);
  return (
    <ResponsiveSunburst
      data={{
        path: '/',
        type: 'tree',
        children: repo,
      }}
      identity="path"
      value={(node: FileNode): number => {
        return node.type === 'tree'
          ? 0
          : items.filter((item) => item.path === node.path).length + 1;
      }}
      label={(node: FileNode): string => node.pathArray[node.level]}
    />
  );
};

export default Sunburst;
