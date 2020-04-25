import React, { FC, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { drawerWidth } from '../config/themeConfig';
import useData from '../hooks/useData';
import Loading from './Loading';
import Main from './Main';
import { actions as uiActions } from '../store/ui';
import { actions as dataActions } from '../store/data';
import { actions as newItemActions } from '../store/newItem';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      flexGrow: 1,
      display: 'flex',
      minHeight: '100vh',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    button: {
      marginRight: theme.spacing(2),
    },
  })
);

const App: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const reset = useCallback(() => {
    dispatch(uiActions.reset());
    dispatch(newItemActions.reset());
    dispatch(dataActions.reset());
  }, [dispatch]);
  const { repo } = useData();
  return (
    <div className={classes.app}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography onClick={reset} variant="h6" className={classes.title}>
            Tech Debt Tracker
          </Typography>
          {/* <Button
            color="secondary"
            onClick={(): void => {
              dispatch(uiActions.toggleNewItem(true));
            }}
          >
            New Item
          </Button> */}
        </Toolbar>
      </AppBar>
      {/* <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        {items.length > 0 && <SideBar />}
      </Drawer> */}
      {repo.length > 0 ? <Main /> : <Loading />}
    </div>
  );
};

export default App;
