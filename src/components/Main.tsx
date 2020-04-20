import React, { FC } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import TreeMap from './TreeMap';
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Paper,
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
      height: '50vh',
    },
  })
);

const Main: FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Toolbar />
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12} xl={6}>
          <Paper className={classes.card}>
            <TreeMap />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.card}>
            <Sunburst />
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
};

export default Main;
