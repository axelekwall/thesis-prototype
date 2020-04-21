import React, { FC, useCallback } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { State } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { format, compareAsc } from 'date-fns';
import { DebtItem } from '../store/data';
import { actions } from '../store/ui';
import { FileNode } from '../data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      padding: theme.spacing(3),
    },
  })
);

const SideBar: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector<State, Array<DebtItem>>(
    (state) => state.data.items
  );
  const selectedFile = useSelector<State, FileNode | null>(
    (state) => state.ui.selectedFile
  );
  const filterItems = useCallback(
    (item: DebtItem) => {
      if (selectedFile === null) return true;
      return item.path?.includes(selectedFile.path);
    },
    [selectedFile]
  );
  return (
    <List className={classes.root}>
      <ListSubheader component="div" id="nested-list-subheader">
        {selectedFile === null
          ? 'All debt items'
          : `Debt items for ${selectedFile.path}${
              selectedFile.type === 'tree' && selectedFile.level >= 0 ? '/' : ''
            }`}
      </ListSubheader>
      {items
        .filter(filterItems)
        .sort((a, b) => a.deadline - b.deadline)
        .map((item) => (
          <ListItem button key={item.id} alignItems="flex-start">
            <ListItemText
              onMouseEnter={(): void => {
                dispatch(actions.itemfocused(item));
              }}
              onMouseLeave={(): void => {
                dispatch(actions.itemfocused(null));
              }}
              onClick={(): void => {
                dispatch(actions.itemSelected(item));
              }}
              primary={item.title}
              secondary={format(new Date(item.deadline), 'PPP')}
            ></ListItemText>
          </ListItem>
        ))}
    </List>
  );
};

export default SideBar;
