import React, { FC } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { useItemInteraction } from '../hooks/interactions';
import ItemForm from './ItemForm';
import Save from '@material-ui/icons/Save';
import { actions as editItemActions } from '../store/editItem';

import { actions as dataActions, DebtItem } from '../store/data';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
    },
  })
);

const ItemCard: FC = () => {
  const classes = useStyles();
  const { selectedItem, setSelectedItem } = useItemInteraction();
  const dispatch = useDispatch();
  const editItem = useSelector<State, DebtItem>((state) => state.editItem);
  return selectedItem !== null ? (
    <Grid item>
      <Paper className={classes.card}>
        <Grid container direction="column">
          <Grid item container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="h6">{selectedItem.title}</Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={(): void => {
                  dispatch(editItemActions.reset());
                  setSelectedItem(null);
                }}
                startIcon={<Close />}
              >
                Close
              </Button>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <ItemForm
              stateKey="editItem"
              action={editItemActions.fieldUpdated}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={(): void => {
                dispatch(dataActions.updateItem(editItem));
                dispatch(editItemActions.reset());
                setSelectedItem(null);
              }}
              startIcon={<Save />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  ) : null;
};

export default ItemCard;
