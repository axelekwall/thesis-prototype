import { useSelector, useDispatch } from 'react-redux';
import { State } from '../store';
import { FileNode } from '../data';
import { useCallback } from 'react';
import { actions } from '../store/ui';
import { DebtItem } from '../store/data';

export const useFileInteraction = () => {
  const dispatch = useDispatch();
  const selectedFile = useSelector<State, FileNode | null>(
    (state) => state.ui.selectedFile
  );
  const focusedFile = useSelector<State, FileNode | null>(
    (state) => state.ui.focusedFile
  );
  const setSelectedFile = useCallback((file: FileNode | null) => {
    dispatch(actions.fileSelected(file));
  }, []);
  const setFocusedFile = useCallback((file: FileNode | null) => {
    dispatch(actions.fileFocused(file));
  }, []);
  return { setFocusedFile, setSelectedFile, selectedFile, focusedFile };
};

export const useItemInteraction = () => {
  const dispatch = useDispatch();
  const selectedItem = useSelector<State, DebtItem | null>(
    (state) => state.ui.selectedItem
  );
  const focusedItem = useSelector<State, DebtItem | null>(
    (state) => state.ui.focusedItem
  );
  const setSelectedItem = useCallback((item: DebtItem | null) => {
    dispatch(actions.itemSelected(item));
  }, []);
  const setFocusedItem = useCallback((item: DebtItem | null) => {
    dispatch(actions.itemfocused(item));
  }, []);
  return { setFocusedItem, setSelectedItem, selectedItem, focusedItem };
};
