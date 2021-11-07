import React from "react";
import {Route, Redirect, useLocation} from "react-router-dom";

type TProtectedRoute<T> = {
  isLoggedIn: boolean;
  path: string;
  component:  React.ComponentType<any>;
} & T;

const ProtectedRoute = <T extends {}>({component: Component, isLoggedIn, ...props}: TProtectedRoute<T>) => {
  const location = useLocation()
  return (
    <Route> {
      isLoggedIn ? <Component {...props} /> : <Redirect to={{
        pathname: '/login',
        state: { from: location }
      }}
      />
    }
    </Route>
  );
};

export default ProtectedRoute;
