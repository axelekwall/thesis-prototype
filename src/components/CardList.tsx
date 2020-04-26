import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store';
import { DebtItem, actions as dataActions } from '../store/data';
import { actions as uiActions } from '../store/ui';
import { actions as newItemActions } from '../store/newItem';
import { FileNode } from '../data';
import {
  Paper,
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import { format } from 'date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    card: {
      backgroundColor: theme.palette.primary.light,
    },
  })
);

const CardList: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector<State, Array<DebtItem>>(
    (state) => state.data.items
  );
  const selectedFile = useSelector<State, FileNode | null>(
    (state) => state.ui.selectedFile
  );
  const newItem = useSelector<State, DebtItem>((state) => state.newItem);
  const filterItems = useCallback(
    (item: DebtItem) => {
      if (selectedFile === null) return true;
      return item.path === selectedFile.path;
    },
    [selectedFile]
  );
  return (
    <Paper className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6">
            {selectedFile === null
              ? 'All debt items'
              : `Debt items for ${selectedFile.path}${
                  selectedFile.type === 'tree' && selectedFile.level >= 1
                    ? '/'
                    : ''
                }`}
          </Typography>
        </Grid>
        {items
          .filter(filterItems)
          .sort((a, b) => a.deadline - b.deadline)
          .map((item) => (
            <Grid key={item.id} item>
              <Card
                className={classes.card}
                onMouseEnter={(): void => {
                  dispatch(uiActions.itemfocused(item));
                }}
                onMouseLeave={(): void => {
                  dispatch(uiActions.itemfocused(null));
                }}
                onClick={(): void => {
                  dispatch(uiActions.itemSelected(item));
                }}
              >
                <CardContent>
                  <Typography color="textSecondary">
                    {format(new Date(item.deadline), 'PPP')}
                  </Typography>
                  <Typography variant="subtitle1">{item.title}</Typography>
                </CardContent>
                <CardActions>
                  <Button color="secondary">Edit</Button>
                  <Button
                    onClick={(): void => {
                      dispatch(dataActions.deleteItem(item.id));
                      dispatch(uiActions.itemfocused(null));
                    }}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        <Grid item>
          <Button
            onClick={(): void => {
              dispatch(
                newItemActions.fieldUpdated({
                  ...newItem,
                  path: selectedFile?.path ?? '/',
                })
              );
              dispatch(uiActions.toggleNewItem(true));
            }}
            color="secondary"
            fullWidth
          >
            New Item
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardList;
