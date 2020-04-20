import React, { FC } from 'react';
import { createStyles, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    loadingWrapper: {
      height: '100vh',
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
      display: 'flex',
    },
  })
);

const Loading: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingWrapper}>
      <Typography variant="h4">Loading...</Typography>
    </div>
  );
};
export default Loading;
