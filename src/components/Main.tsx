import React, { FC } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Save from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
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
import FileCard from './FileCard';
import TreeGraph from './TreeGraph';

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
      color: 'black',
    },
  })
);

const Main: FC = () => {
  const classes = useStyles();
  const { selectedItem, newItem } = useSelector<State, UiState>(
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
                <Grid container direction="column" spacing={2}>
                  <Grid item container direction="row" justify="space-between">
                    <Grid item>
                      <Typography variant="h6">Create new item</Typography>
                    </Grid>
                    <Grid item>
                      <Button startIcon={<Close />}>Close</Button>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <NewItem />
                  </Grid>
                  <Grid item>
                    <Button startIcon={<Save />}>Save</Button>
                    <Button startIcon={<Delete />}>Reset</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
          <FileCard />
          {selectedItem !== null && (
            <Grid item>
              <Paper className={classes.card}>
                <Typography variant="h6">{selectedItem.title}</Typography>
              </Paper>
            </Grid>
          )}
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

export default Main;
