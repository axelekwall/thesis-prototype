import React, { FC, useEffect } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Close from '@material-ui/icons/Close';
import { FileNode } from '../data';
import { State } from '../store';
import * as leasot from 'leasot';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
    },
  })
);

const FileCard: FC = () => {
  const classes = useStyles();
  const selectedFile = useSelector<State, FileNode | null>(
    (state) => state.ui.selectedFile
  );
  useEffect(() => {
    if (selectedFile !== null) {
      fetch(selectedFile.url)
        .then((res) => res.json())
        .then((data) => {
          console.log(leasot.parse(atob(data.content), { extension: '.ts' }));
        });
    }
  }, [selectedFile]);
  return selectedFile !== null ? (
    <Grid item>
      <Paper className={classes.card}>
        <Grid container direction="column">
          <Grid item container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="h6">{selectedFile.path}</Typography>
            </Grid>
            <Grid item>
              <Button startIcon={<Close />}>Close</Button>
            </Grid>
          </Grid>
          <Grid item container direction="row"></Grid>
        </Grid>
      </Paper>
    </Grid>
  ) : null;
};

export default FileCard;
