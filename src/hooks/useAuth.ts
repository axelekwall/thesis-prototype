import { useEffect, useCallback } from 'react';
import { auth, githubProvider } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store';
import { actions, AuthState } from '../store/auth';

interface UseAuth {
  state: AuthState;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const signIn = useCallback(async () => {
    try {
      const result: any = await auth.signInWithPopup(githubProvider);
      console.log(result);
      const token = result.credential.accessToken;
      if (token) {
        dispatch(actions.setToken(token));
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth, dispatch, actions]);
  const signOut = useCallback(async () => {
    await auth.signOut();
  }, [auth]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((fbUser) => {
      try {
        if (fbUser) {
          const { displayName, photoURL, email } = fbUser;
          dispatch(
            actions.authSuccess({
              displayName,
              photoURL,
              email,
            })
          );
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
  return {
    state: useSelector<State, AuthState>((state) => state.auth),
    signIn,
    signOut,
  };
};

export default useAuth;
