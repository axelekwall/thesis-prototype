import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { Group } from '@vx/group';
import { Partition } from '@vx/hierarchy';
import { ParentSize } from '@vx/responsive';
import { scaleLinear } from '@vx/scale';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { hierarchy, HierarchyRectangularNode } from 'd3-hierarchy';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { FileNode } from '../data';
import { DataState } from '../store/data';
import { useTheme } from '@material-ui/core/styles';
import { orange, yellow } from '@material-ui/core/colors';
import { useItemInteraction, useFileInteraction } from '../hooks/interactions';

let tooltipTimeout: NodeJS.Timeout;

const PartitionTree = withTooltip<{ width: number; height: number }, FileNode>(
  ({
    width,
    height,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
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
      repoTree.forEach(
        (fileNode) => {
          const num = items.filter(
            (item) =>
              item.path === fileNode.path && item.completed === undefined
          ).length;
          if (num > max) {
            max = num;
          }
        },
        [repoTree, items]
      );
      const rootNum = items.filter((item) => item.path === '/').length;
      if (rootNum > max) {
        max = rootNum;
      }
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
          focusedFile?.path === d.data.path ||
          selectedFile?.path === d.data.path
        )
          return yellow['300'];
        const debtItemCount = items.filter(
          (item) => item.path === d.data.path && item.completed === undefined
        ).length;
        return colorScale(debtItemCount);
      },
      [focusedItem, items, focusedFile, selectedFile]
    );
    return (
      <>
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
                        if (tooltipTimeout) clearTimeout(tooltipTimeout);
                        const top = node.y0;
                        const left = node.x0;
                        showTooltip({
                          tooltipData: node.data,
                          tooltipTop: top,
                          tooltipLeft: left,
                        });
                        setFocusedFile(node.data);
                      }}
                      onMouseLeave={(): void => {
                        setFocusedFile(null);
                        tooltipTimeout = setTimeout(() => {
                          hideTooltip();
                        }, 300);
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
        {tooltipOpen && (
          <TooltipWithBounds
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              minWidth: 60,
              backgroundColor: 'rgba(0,0,0,0.9)',
              color: 'white',
            }}
          >
            <div style={{ color: 'white' }}>
              <strong>{tooltipData?.path}</strong>
            </div>
            {/* <div>{tooltipData.bar.data[tooltipData.key]}</div> */}
          </TooltipWithBounds>
        )}
      </>
    );
  }
);

const TreeGraph: FC = () => (
  <ParentSize>
    {({ width, height }): ReactNode => (
      <PartitionTree width={width} height={height} />
    )}
  </ParentSize>
);

export default TreeGraph;
