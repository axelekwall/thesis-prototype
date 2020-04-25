import React, { FC } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { useItemInteraction } from '../hooks/interactions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
    },
  })
);

const ItemCard: FC = () => {
  const classes = useStyles();
  const { selectedItem, setSelectedItem } = useItemInteraction();
  return selectedItem !== null ? (
    <Grid item>
      <Paper className={classes.card}>
        <Grid container direction="column">
          <Grid item container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="h6">{selectedItem.title}</Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={(): void => {
                  setSelectedItem(null);
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

export default ItemCard;
