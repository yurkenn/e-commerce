import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => (loggedIn ? <Component {...props} /> : <Redirect to="/signin" />)}
    />
  );
};

export default ProtectedRoute;
