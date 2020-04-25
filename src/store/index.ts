import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ui from './ui';
import auth from './auth';
import data from './data';
import newItem from './newItem';
import editItem from './editItem';

const reducer = combineReducers({
  data,
  ui,
  auth,
  newItem,
  editItem,
});

const store = configureStore({ reducer });

export type State = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
