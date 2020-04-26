import React, { FC, ReactNode, useMemo } from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { useSelector } from 'react-redux';
import { DebtItem, DebtTypes } from '../store/data';
import { State } from '../store';
import { ParentSize } from '@vx/responsive';
import typeColor from '../helpers/typeColor';

type Data = {
  [key in DebtTypes]: number;
};

const PieComponent: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;
  const items = useSelector<State, Array<DebtItem>>(
    (state) => state.data.items
  );
  const data = useMemo<Data>(() => {
    const data = {} as Data;
    items.forEach((item) => {
      if (data[item.type] !== undefined) {
        data[item.type] += item.estimate;
      } else {
        data[item.type] = item.estimate;
      }
    });
    return data;
  }, [items]);

  return (
    <svg width={width} height={height}>
      <Group top={centerY} left={centerX}>
        <Pie
          data={Object.entries(data)}
          pieValue={(d): number => d[1]}
          outerRadius={radius}
          innerRadius={radius / 3}
          cornerRadius={3}
          padAngle={0.01}
        >
          {(pie): ReactNode =>
            pie.arcs.map((arc) => {
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const { startAngle, endAngle } = arc;
              const hasSpaceForLabel = endAngle - startAngle >= 0.1;
              return (
                <g key={arc.data[0]}>
                  <path
                    d={pie.path(arc) as string}
                    fill={typeColor(arc.data[0] as DebtTypes)}
                    fillOpacity={1}
                  />
                  {/* {hasSpaceForLabel && (
                    <text
                      fill={'white'}
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fontSize={14}
                      textAnchor="middle"
                    >
                      {arc.data[0]}
                    </text>
                  )} */}
                </g>
              );
            })
          }
        </Pie>
      </Group>
    </svg>
  );
};

const PieGraph: FC = () => (
  <ParentSize>
    {({ width, height }): ReactNode => (
      <PieComponent width={width} height={height}></PieComponent>
    )}
  </ParentSize>
);

export default PieGraph;
