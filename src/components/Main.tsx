import React, { FC, useMemo } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import CardList from './CardList';
import FileCard from './FileCard';
import TreeGraph from './TreeGraph';
import ItemCard from './ItemCard';
import NewItemCard from './NewItemCard';
import PieGraph from './PieGraph';
import { LegendOrdinal, LegendLinear } from '@vx/legend';
import StackedBarGraph from './StackedBarGraph';
import { scaleOrdinal, scaleLinear } from '@vx/scale';
import { green, red, orange } from '@material-ui/core/colors';
import { DebtTypes, DataState } from '../store/data';
import typeColor from '../helpers/typeColor';
import { useSelector } from 'react-redux';
import { State } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    card: {
      padding: theme.spacing(2),
    },
    chartWrapper: {
      position: 'relative',
      height: '30vw',
    },
    pieWrapper: {
      position: 'relative',
      height: '20vw',
    },
    column: {
      overflowY: 'scroll',
      flexWrap: 'nowrap',
      overflowX: 'hidden',
      maxHeight: '97vh',
    },
  })
);

const barColor = scaleOrdinal({
  domain: ['completed', 'due'],
  range: [green['400'], red['400']],
});

const types: Array<DebtTypes> = [
  'Architectural',
  'Code',
  'Documentation',
  'Environmental',
  'Testing',
];

const pieColor = scaleOrdinal({
  domain: types,
  range: types.map((type) => typeColor(type)),
});

const Main: FC = () => {
  const { items, repoTree } = useSelector<State, DataState>(
    (state) => state.data
  );
  const maxItems = useMemo(() => {
    let max = 0;
    repoTree.forEach((fileNode) => {
      const num = items.filter((item) => item.path === fileNode.path).length;
      if (num > max) {
        max = num;
      }
    });
    const rootNum = items.filter((item) => item.path === '/').length;
    if (rootNum > max) {
      max = rootNum;
    }
    return max;
  }, [items, repoTree]);
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Grid container justify="center" spacing={2}>
        <Grid
          className={classes.column}
          item
          container
          xs={3}
          direction="column"
        >
          <Toolbar />
          <CardList />
        </Grid>
        <Grid
          className={classes.column}
          item
          container
          xs={9}
          direction="column"
          spacing={2}
        >
          <Toolbar />
          <NewItemCard />
          <FileCard />
          <ItemCard />
          <Grid item>
            <Paper className={classes.card}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="h6">Project Overview</Typography>
                </Grid>
                <Grid item>
                  <div className={classes.chartWrapper}>
                    <TreeGraph />
                  </div>
                </Grid>
                <Grid item>
                  <LegendLinear
                    direction="row"
                    scale={scaleLinear({
                      domain: [0, maxItems],
                      range: [orange['100'], orange['400']],
                    })}
                  ></LegendLinear>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={4}>
              <Paper className={classes.card}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography variant="h6">Debt Type Overview</Typography>
                  </Grid>
                  <Grid item>
                    <div className={classes.pieWrapper}>
                      <PieGraph />
                    </div>
                  </Grid>
                  <Grid item>
                    <LegendOrdinal scale={pieColor}></LegendOrdinal>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.card}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography variant="h6">Past and upcoming debt</Typography>
                  </Grid>
                  <Grid item>
                    <div className={classes.pieWrapper}>
                      <StackedBarGraph />
                    </div>
                  </Grid>
                  <Grid item>
                    <LegendOrdinal scale={barColor}></LegendOrdinal>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

export default Main;
