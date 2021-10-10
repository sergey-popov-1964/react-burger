import React from "react";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
  console.log(props.isLoggedIn)
  return (
    <Route> {
      props.isLoggedIn ? <Component { ...props} /> : <Redirect to="/login"/>
    }
    </Route>
  );
};

export default ProtectedRoute;
