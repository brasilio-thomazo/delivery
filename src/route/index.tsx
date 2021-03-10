import React from "react";
import { Route, Switch } from "react-router-dom";

import { Login } from "../pages/login";
import { Home } from "../pages/home";
import { Clients } from "../pages/clients";
import { Products } from "../pages/products";
import { useSelector } from "react-redux";
import { Pdv } from "../pages/pdv";

type Props = React.PropsWithChildren<{}>;
type PrivateProps = React.PropsWithChildren<{
  path: string;
  component: React.FC;
}>;

export const PrivateRoute: React.FC<PrivateProps> = ({ path, component }) => {
  const { authenticate } = useSelector((state: AppState) => state);
  return authenticate ? (
    <Route exact path={path} component={component} />
  ) : (
    <Route exact path={path} component={Login} />
  );
};

export const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <PrivateRoute path="/clients" component={Clients} />
      <PrivateRoute path="/products" component={Products} />
      <PrivateRoute path="/pdv" component={Pdv} />
      <PrivateRoute path="/" component={Home} />
    </Switch>
  );
};
