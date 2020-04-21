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
import { useSelector } from 'react-redux';
import { FileNode } from '../data';
import { State } from '../store';
import CardList from './CardList';

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
  const selectedFile = useSelector<State, FileNode | null>(
    (state) => state.ui.selectedFile
  );
  return (
    <main className={classes.main}>
      <Toolbar />
      <Grid container justify="center" spacing={4}>
        <Grid item container xs={3} direction="column">
          <CardList />
        </Grid>

        <Grid item container xs={9} direction="column">
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
      </Grid>
    </main>
  );
};

export default Main;
