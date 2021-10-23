import React from "react";
import {Route, Redirect, useLocation} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
  const location = useLocation()
  return (
    props.isReady && <Route> {
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

