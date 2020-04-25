import React, { FC } from 'react';
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
    column: {
      overflowY: 'scroll',
      flexWrap: 'nowrap',
      overflowX: 'hidden',
      maxHeight: '97vh',
    },
  })
);

const Main: FC = () => {
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

export default Main;
