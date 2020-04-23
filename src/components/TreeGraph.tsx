import React, { FC, ReactNode, useCallback } from 'react';
import { Group } from '@vx/group';
import { Partition } from '@vx/hierarchy';
import { ParentSize } from '@vx/responsive';
import { scaleLinear } from '@vx/scale';
import { hierarchy, HierarchyRectangularNode } from 'd3-hierarchy';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { FileNode } from '../data';
import { DataState, DebtItem } from '../store/data';
import { useTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

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
  ).sum((d) => (d.size ? Math.sqrt(d.size) : 1));

  const colorScale = useCallback(
    scaleLinear({ domain: [0, levels], range: [orange['100'], orange['400']] }),
    []
  );
  const matchColors = useCallback(
    (d: HierarchyRectangularNode<FileNode>): string => {
      if (focusedItem?.path === d.data.path)
        return theme.palette.secondary.main;
      const debtItemCount = items.filter((item) => item.path === d.data.path)
        .length;
      return colorScale(debtItemCount);
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
