import { useSelector, useDispatch } from 'react-redux';
import { State } from '../store';
import { useCallback } from 'react';
import { DebtItem } from '../store/data';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useItemState = (key: 'newItem' | 'editItem', action: any) => {
  const newItem = useSelector<State, DebtItem>((state) => state[key]);
  const dispatch = useDispatch();
  const createOnUpdate = useCallback(
    (key: keyof DebtItem) => (e: any): void => {
      let value;
      if (['deadline', 'created', 'completed'].includes(key)) {
        value = e.valueOf();
      } else {
        e.preventDefault();
        value = e.target.value;
      }
      dispatch(
        action({
          ...newItem,
          ...{ [key]: value },
        })
      );
    },
    [newItem]
  );
  return { newItem, createOnUpdate };
};

export default useItemState;
