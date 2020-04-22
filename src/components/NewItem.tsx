import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../store';
import { NewItemState, actions } from '../store/newItem';
import { makeStyles, Theme, createStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const NewItem: FC = () => {
  const classes = useStyles();
  const newItem = useSelector<State, NewItemState>((state) => state.newItem);
  const dispatch = useDispatch();
  const createOnUpdate = useCallback(
    (key: keyof NewItemState) => (e: any): void => {
      e.preventDefault();
      dispatch(
        actions.fieldUpdated({
          ...newItem,
          ...{ [key]: e.target.value },
        })
      );
    },
    [newItem]
  );
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        required
        onChange={createOnUpdate('title')}
        label="Title"
        value={newItem.title}
      />
      <TextField
        required
        onChange={createOnUpdate('path')}
        label="Path"
        value={newItem.path}
        variant="filled"
      />
    </form>
  );
};

export default NewItem;
