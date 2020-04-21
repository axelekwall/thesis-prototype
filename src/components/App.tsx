import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { drawerWidth } from '../config/themeConfig';
import useData from '../hooks/useData';
import Loading from './Loading';
import Main from './Main';
import SideBar from './SideBar';

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
  const { repo, items } = useData();
  return (
    <div className={classes.app}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tech Debt Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        {items.length > 0 && <SideBar />}
      </Drawer>
      {repo.length > 0 ? <Main /> : <Loading />}
    </div>
  );
};

export default App;
