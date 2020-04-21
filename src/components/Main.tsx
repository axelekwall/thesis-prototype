import React, { FC } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import TreeMap from './TreeMap';
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Sunburst from './Sunburst';

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
      height: '60vh',
    },
    paperTitle: {
      marginBottom: theme.spacing(1),
    },
  })
);

const Main: FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Toolbar />
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12} xl={9}>
          <Paper className={classes.card}>
            <Typography className={classes.paperTitle} variant="h6">
              Project Overview
            </Typography>
            <div className={classes.chartWrapper}>
              <TreeMap />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
};

export default Main;
