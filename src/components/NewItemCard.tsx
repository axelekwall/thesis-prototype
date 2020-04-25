import React, { FC } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import NewItem from './NewItem';
import Save from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../store';
import { actions } from '../store/ui';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
    },
  })
);

const NewItemCard: FC = () => {
  const newItem = useSelector<State, boolean>((state) => state.ui.newItem);
  const dispatch = useDispatch();
  const classes = useStyles();
  return newItem ? (
    <Grid item>
      <Paper className={classes.card}>
        <Grid container direction="column" spacing={2}>
          <Grid item container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="h6">Create new item</Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={(): void => {
                  dispatch(actions.toggleNewItem(false));
                }}
                startIcon={<Close />}
              >
                Close
              </Button>
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
  ) : null;
};

export default NewItemCard;
