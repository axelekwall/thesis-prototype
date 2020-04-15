import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ui from './ui';

const reducer = combineReducers({
  ui,
});

const store = configureStore({ reducer });

export type State = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
