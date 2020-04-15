import React, { FC } from 'react';
import useAuth from '../hooks/useAuth';
import {
  Typography,
  Button,
  Drawer,
  Avatar,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { drawerWidth } from '../config/themeConfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      flexGrow: 1,
      display: 'flex',
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
    loadingWrapper: {
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  })
);

const App: FC = () => {
  const {
    state: { initialized, user },
    signIn,
    signOut,
  } = useAuth();
  const classes = useStyles();

  if (initialized) {
    return (
      <div className={classes.app}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Tech Debt Tracker
            </Typography>
            <Button
              color="inherit"
              className={classes.button}
              onClick={user ? signOut : signIn}
            >
              {user ? 'Sign Out' : 'Sign In'}
            </Button>
            {user && <Avatar src={user.photoURL as string}></Avatar>}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar />
        </Drawer>
        <main>
          <Toolbar />
          Content
        </main>
      </div>
    );
  } else {
    return (
      <div className={classes.loadingWrapper}>
        <Typography variant="h4">Loading...</Typography>
      </div>
    );
  }
};

export default App;
