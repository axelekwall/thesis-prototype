import React, { FC } from 'react';
import {
  makeStyles,
  createStyles,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import useItemState from '../hooks/useItemState';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    formControl: {
      width: '100%',
    },
  })
);

interface Props {
  stateKey: 'newItem' | 'editItem';
  action: any;
}

const ItemForm: FC<Props> = ({ stateKey, action }) => {
  const classes = useStyles();
  const { newItem, createOnUpdate } = useItemState(stateKey, action);
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            color="secondary"
            onChange={createOnUpdate('title')}
            label="Title"
            value={newItem.title}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            onChange={createOnUpdate('path')}
            label="Path"
            value={newItem.path}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            onChange={createOnUpdate('description')}
            label="Description"
            multiline
            value={newItem.description}
            color="secondary"
          />
        </Grid>
        <Grid item xs={4}>
          <KeyboardDatePicker
            disableToolbar
            fullWidth
            variant="inline"
            format="MM/dd/yyyy"
            label="Deadline"
            color="secondary"
            value={new Date(newItem.deadline)}
            onChange={createOnUpdate('deadline')}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              value={newItem.type}
              color="secondary"
              onChange={createOnUpdate('type')}
            >
              <MenuItem value="Documentation">Documentation</MenuItem>
              <MenuItem value="Code">Code</MenuItem>
              <MenuItem value="Architectural">Architectural</MenuItem>
              <MenuItem value="Environmental">Environmental</MenuItem>
              <MenuItem value="Testing">Testing</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              value={newItem.priority}
              color="secondary"
              onChange={createOnUpdate('priority')}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;
