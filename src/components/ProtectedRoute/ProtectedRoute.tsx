import React from "react";
import {Route, Redirect, useLocation} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}:any) => {
  const location = useLocation()
  return (
    <Route> {
      props.isLoggedIn ? <Component {...props} /> : <Redirect to={{
        pathname: '/login',
        state: { from: location }
      }}
      />
    }
    </Route>
  );
};

export default ProtectedRoute;
