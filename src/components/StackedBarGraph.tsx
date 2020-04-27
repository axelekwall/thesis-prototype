import React, { useCallback, FC, ReactNode, useMemo } from 'react';
import { BarStack } from '@vx/shape';
import { Group } from '@vx/group';
import { Grid } from '@vx/grid';
import { AxisBottom, AxisRight } from '@vx/axis';
import { scaleBand, scaleLinear } from '@vx/scale';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { DebtItem } from '../store/data';
import { ParentSize } from '@vx/responsive';
import { format, isWithinInterval, add, compareAsc, parse } from 'date-fns';
import { green, red } from '@material-ui/core/colors';

interface Data {
  [key: string]: {
    due: number;
    completed: number;
  };
}

const formatDate = (date: number): string => format(new Date(date), 'yyyy-MMM');

let tooltipTimeout: NodeJS.Timeout;

const StackedBars = withTooltip<{ width: number; height: number }, any>(
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
    // bounds
    const xMax = width - 30;
    const yMax = height - 40;
    const today = new Date();
    const items = useSelector<State, Array<DebtItem>>((state) =>
      state.data.items.filter((item) =>
        isWithinInterval(item.deadline, {
          start: add(new Date(today.getFullYear(), today.getMonth()), {
            months: -5,
          }),
          end: add(new Date(today.getFullYear(), today.getMonth()), {
            months: 7,
          }),
        })
      )
    );

    const data = useMemo<Data>(() => {
      const data = {} as Data;
      items.forEach((item) => {
        const itemDeadline = formatDate(item.deadline);
        if (data[itemDeadline] === undefined) {
          data[itemDeadline] = {
            due: 0,
            completed: 0,
          };
        }
        if (item.completed) {
          data[itemDeadline].completed += 1;
        } else {
          data[itemDeadline].due += 1;
        }
      });
      return data;
    }, [items]);

    const xScale = useCallback(
      scaleBand({
        domain: items
          .map((d) => formatDate(d.deadline))
          .sort((a, b) => {
            return compareAsc(
              parse(a, 'yyyy-MMM', new Date()),
              parse(b, 'yyyy-MMM', new Date())
            );
          }),
        padding: 0.2,
      }),
      [items]
    );

    const yScale = useCallback(
      scaleLinear<number>({
        domain: [
          0,
          Math.max(...Object.values(data).map((d) => d.completed + d.due)),
        ],
        nice: true,
      }),
      [data]
    );

    xScale.rangeRound([0, xMax]);
    yScale.range([yMax, 0]);

    return (
      <>
        <svg width={width} height={height}>
          <Grid
            top={10}
            left={0}
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            stroke={'white'}
            strokeOpacity={0.1}
            xOffset={xScale.bandwidth() / 2}
          />
          <Group top={10}>
            <BarStack
              data={Object.entries(data).map((d) => ({ key: d[0], ...d[1] }))}
              keys={['due', 'completed']}
              x={(d): string => d.key}
              xScale={xScale}
              yScale={yScale}
              color={(d): string =>
                d === 'completed' ? green['400'] : red['400']
              }
            >
              {(barStacks): ReactNode => {
                return barStacks.map((barStack) => {
                  return barStack.bars.map((bar) => {
                    return (
                      <rect
                        key={bar.bar.data.key}
                        x={bar.x}
                        y={bar.y}
                        height={bar.height}
                        width={bar.width}
                        fill={bar.color}
                        onMouseLeave={(): void => {
                          tooltipTimeout = setTimeout(() => {
                            hideTooltip();
                          }, 300);
                        }}
                        onMouseEnter={(): void => {
                          if (tooltipTimeout) clearTimeout(tooltipTimeout);
                          const top = (bar.height + bar.y) / 2;
                          const left = bar.x + bar.width;
                          showTooltip({
                            tooltipData: bar,
                            tooltipTop: top,
                            tooltipLeft: left,
                          });
                        }}
                      />
                    );
                  });
                });
              }}
            </BarStack>
          </Group>
          <AxisBottom
            top={yMax + 10}
            scale={xScale}
            stroke={'white'}
            tickStroke={'white'}
            tickLabelProps={(): any => ({
              fill: 'white',
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
          <AxisRight
            left={xMax}
            top={10}
            scale={yScale}
            stroke={'white'}
            numTicks={1}
            hideZero={true}
            tickStroke={'white'}
            tickLabelProps={(): any => ({
              fill: 'white',
              fontSize: 14,
            })}
          />
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
            <div style={{ color: 'white', textTransform: 'capitalize' }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>Items: {tooltipData.bar.data[tooltipData.key]}</div>
          </TooltipWithBounds>
        )}
      </>
    );
  }
);

const StackedBarGraph: FC = () => (
  <ParentSize>
    {({ width, height }): ReactNode => (
      <StackedBars width={width} height={height}></StackedBars>
    )}
  </ParentSize>
);

export default StackedBarGraph;
