import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from "./components/Login"
import Question from "./components/Question"
import Result from "./components/Result"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = (props) => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/question/" component={(props)=><Question {...props} /> } />
      <Route path="/signin" component={(props)=><Login {...props}/>} />
      <PrivateRoute path="/result" component={(props)=><Result {...props}/>} />
      <Route path="*" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;