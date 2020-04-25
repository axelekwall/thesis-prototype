import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { Group } from '@vx/group';
import { Partition } from '@vx/hierarchy';
import { ParentSize } from '@vx/responsive';
import { scaleLinear } from '@vx/scale';
import { hierarchy, HierarchyRectangularNode } from 'd3-hierarchy';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { FileNode } from '../data';
import { DataState } from '../store/data';
import { useTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { useItemInteraction, useFileInteraction } from '../hooks/interactions';

const PartitionTree: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  const { repo, items, repoTree } = useSelector<State, DataState>(
    (state) => state.data
  );
  const {
    setFocusedFile,
    setSelectedFile,
    selectedFile,
    focusedFile,
  } = useFileInteraction();
  const theme = useTheme();
  const { focusedItem } = useItemInteraction();
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
  const maxItems = useMemo(() => {
    let max = 0;
    repoTree.forEach((fileNode) => {
      const num = items.filter((item) => item.path === fileNode.path).length;
      if (num > max) {
        max = num;
      }
    });
    return max;
  }, [items, repo]);
  const colorScale = useCallback(
    scaleLinear({
      domain: [0, maxItems],
      range: [orange['100'], orange['400']],
    }),
    [maxItems]
  );
  const matchColors = useCallback(
    (d: HierarchyRectangularNode<FileNode>): string => {
      if (
        focusedItem?.path === d.data.path ||
        focusedFile?.path === d.data.path
      )
        return theme.palette.secondary.main;
      const debtItemCount = items.filter((item) => item.path === d.data.path)
        .length;
      return colorScale(debtItemCount);
    },
    [focusedItem, items, focusedFile]
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
                  onClick={(): void => {
                    setSelectedFile(selectedFile ? null : node.data);
                  }}
                  onMouseEnter={(): void => {
                    setFocusedFile(node.data);
                  }}
                  onMouseLeave={(): void => {
                    setFocusedFile(null);
                  }}
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
