import React, { FC, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Grid,
  Paper,
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import ItemForm from './ItemForm';
import Save from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../store';
import { actions as uiActions } from '../store/ui';
import { actions as newItemActions } from '../store/newItem';
import { actions as dataActions, DebtItem } from '../store/data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
    },
  })
);

const NewItemCard: FC = () => {
  const newItem = useSelector<State, boolean>((state) => state.ui.newItem);
  const newItemObj = useSelector<State, DebtItem>((state) => state.newItem);
  const dispatch = useDispatch();
  const classes = useStyles();
  const saveItem = useCallback((): void => {
    dispatch(
      dataActions.addItem({
        ...newItemObj,
        id: uuid(),
        created: new Date().valueOf(),
      })
    );
    dispatch(newItemActions.reset());
    dispatch(uiActions.toggleNewItem(false));
  }, [newItemObj, newItemActions, uiActions, dataActions]);
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
                  dispatch(uiActions.toggleNewItem(false));
                }}
                startIcon={<Close />}
              >
                Close
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <ItemForm stateKey="newItem" action={newItemActions.fieldUpdated} />
          </Grid>
          <Grid item>
            <Button onClick={saveItem} startIcon={<Save />}>
              Save
            </Button>
            <Button
              onClick={(): void => {
                dispatch(newItemActions.reset());
              }}
              startIcon={<Delete />}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  ) : null;
};

export default NewItemCard;
