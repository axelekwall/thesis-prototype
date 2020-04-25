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
import { useFileInteraction } from '../hooks/interactions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
    },
  })
);

const FileCard: FC = () => {
  const classes = useStyles();
  const { selectedFile, setSelectedFile } = useFileInteraction();
  useEffect(() => {
    if (selectedFile !== null) {
      fetch(selectedFile.url as string)
        .then((res) => res.json())
        .then((data) => {
          console.log(atob(data.content));
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
              <Button
                onClick={(): void => {
                  setSelectedFile(null);
                }}
                startIcon={<Close />}
              >
                Close
              </Button>
            </Grid>
          </Grid>
          <Grid item container direction="row"></Grid>
        </Grid>
      </Paper>
    </Grid>
  ) : null;
};

export default FileCard;
