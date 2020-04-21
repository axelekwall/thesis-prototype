import React, { FC } from 'react';
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
import { DebtItem } from '../store/data';
import { actions } from '../store/ui';

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
  return (
    <List className={classes.root}>
      {/* <Typography variant="subtitle1" className={classes.title}>
        Upcoming items
      </Typography> */}
      <ListSubheader component="div" id="nested-list-subheader">
        Upcoming deadlines
      </ListSubheader>
      {items.map((item) => (
        <ListItem key={item.description} alignItems="flex-start">
          <ListItemText
            onMouseEnter={(): void => {
              dispatch(actions.itemfocused(item));
            }}
            onMouseLeave={(): void => {
              dispatch(actions.itemfocused(null));
            }}
            primary={item.title}
            secondary={item.deadline}
          ></ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default SideBar;
