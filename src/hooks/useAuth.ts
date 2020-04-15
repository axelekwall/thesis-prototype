import { useEffect } from 'react';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store';
import { actions, AuthState } from '../store/auth';

const useAuth = (): AuthState => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((fbUser) => {
      try {
        if (fbUser) {
          dispatch(actions.authSuccess(fbUser));
        } else {
          dispatch(actions.authReset());
        }
      } catch (error) {
        dispatch(actions.authReset());
        auth.signOut();
      }
    });
    return unsubscribe;
  }, []);
  return useSelector<State, AuthState>((state) => state.auth);
};

export default useAuth;
