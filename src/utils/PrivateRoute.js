import React from 'react';
import { Redirect, Route } from "react-router-dom";
import AuthService from '../services/AuthService';
function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          AuthService.getCurrentUser() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;