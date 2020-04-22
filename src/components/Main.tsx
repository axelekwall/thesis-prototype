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
  Button,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../store';
import CardList from './CardList';
import { UiState } from '../store/ui';
import NewItem from './NewItem';

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
  const { selectedFile, selectedItem, newItem } = useSelector<State, UiState>(
    (state) => state.ui
  );
  return (
    <main className={classes.main}>
      <Toolbar />
      <Grid container justify="center" spacing={2}>
        <Grid item container xs={3} direction="column">
          <CardList />
        </Grid>
        <Grid item container xs={9} direction="column" spacing={2}>
          {newItem && (
            <Grid item>
              <Paper className={classes.card}>
                <Grid container direction="column">
                  <Grid item container direction="row" justify="space-between">
                    <Grid item>
                      <Typography className={classes.paperTitle} variant="h6">
                        Create new item
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button>Close</Button>
                      <Button>Save</Button>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <NewItem />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
          {selectedFile !== null && (
            <Grid item>
              <Paper className={classes.card}>
                <Grid container direction="column">
                  <Grid item container direction="row" justify="space-between">
                    <Grid item>
                      <Typography className={classes.paperTitle} variant="h6">
                        {selectedFile.path}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button>Close</Button>
                    </Grid>
                  </Grid>
                  <Grid item direction="row"></Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
          {selectedItem !== null && (
            <Grid item>
              <Paper className={classes.card}>
                <Typography className={classes.paperTitle} variant="h6">
                  {selectedItem.title}
                </Typography>
              </Paper>
            </Grid>
          )}
          <Grid item>
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
