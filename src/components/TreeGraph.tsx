import React, { FC, ReactNode, useCallback } from 'react';
import { Group } from '@vx/group';
import { Partition } from '@vx/hierarchy';
import { ParentSize } from '@vx/responsive';
import { scaleLinear } from '@vx/scale';
import { hierarchy, HierarchyRectangularNode } from 'd3-hierarchy';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { FileNode } from '../data';
import { DataState, DebtItem, DebtTypes } from '../store/data';
import { useTheme } from '@material-ui/core/styles';

const blue = '#0373d9';
const green = '#00ff70';

const PartitionTree: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  const { repo, items, levels } = useSelector<State, DataState>(
    (state) => state.data
  );
  const theme = useTheme();
  const focusedItem = useSelector<State, DebtItem | null>(
    (state) => state.ui.focusedItem
  );
  const data = hierarchy<FileNode>(
    {
      path: '/',
      type: 'tree',
      level: 0,
      pathArray: ['/'],
      children: repo,
    },
    (d) => d.children
  ).sum((d) => (d.size ? 1 + d.size / 10 : 1));

  const colorScale = useCallback(
    scaleLinear({ domain: [0, 3], range: [blue, green] }),
    []
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
  const matchColors = useCallback(
    (d: HierarchyRectangularNode<FileNode>): string => {
      if (focusedItem?.path === d.data.path) return 'red';
      const tmp = items.filter((item) => item.path === d.data.path);
      if (tmp.length > 1) return 'blue';
      if (tmp.length === 1) return getColorByType(tmp[0].type);
      return colorScale(d.data.level);
    },
    [focusedItem, items]
  );
  return (
    <svg width={width} height={height}>
      <Partition root={data} size={[width, height]}>
        {(tree): ReactNode =>
          tree.descendants().map((node) => {
            const width = node.x1 - node.x0;
            const height = node.y1 - node.y0;
            return (
              <Group key={node.data.path} top={node.y0} left={node.x0}>
                <rect
                  height={height}
                  width={width}
                  fill={matchColors(node)}
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  strokeOpacity={1}
                />
              </Group>
            );
          })
        }
      </Partition>
    </svg>
  );
};

const TreeGraph: FC = () => (
  <ParentSize>
    {({ width, height }): ReactNode => (
      <PartitionTree width={width} height={height} />
    )}
  </ParentSize>
);

export default TreeGraph;
