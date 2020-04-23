import { useSelector, useDispatch } from 'react-redux';
import { State } from '../store';
import { NewItemState } from '../store/newItem';
import { useCallback } from 'react';
import { actions } from '../store/newItem';

const useNewItem = () => {
  const newItem = useSelector<State, NewItemState>((state) => state.newItem);
  const dispatch = useDispatch();
  const createOnUpdate = useCallback(
    (key: keyof NewItemState) => (e: any, sliderValue?: any): void => {
      let value;
      if (['deadline', 'created', 'completed'].includes(key)) {
        value = e.valueOf();
      } else if (['priority', 'estimate'].includes(key)) {
        e.preventDefault();
        value = sliderValue;
      } else {
        e.preventDefault();
        value = e.target.value;
      }
      dispatch(
        actions.fieldUpdated({
          ...newItem,
          ...{ [key]: value },
        })
      );
    },
    [newItem]
  );
  return { newItem, createOnUpdate };
};

export default useNewItem;
