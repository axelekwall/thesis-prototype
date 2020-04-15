import React, { FC } from 'react';
import useAuth from '../hooks/useAuth';

const App: FC = () => {
  const { initialized, user } = useAuth();
  if (initialized) {
    if (user !== null) {
      return <div>hello {user.displayName}</div>;
    } else {
      return <button>Login</button>;
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default App;
