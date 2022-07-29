import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Main, SpareParts } from "./components";
import Clients from "./components/clients/Clients";
import Repairs from "./components/clients/Repairs";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/spare-parts" component={SpareParts} />
      <Route exact path="/clients" component={Clients} />
      <Route exact path="/repairs" component={Repairs} />
    </Switch>
  );
};

export default Routes;
