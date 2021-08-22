import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Main, SpareParts } from './components';
import Clients from './components/clients/Clients';

const Routes = () => {
	return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/spare-parts" component={SpareParts} />
      <Route exact path="/clients" component={Clients} />
    </Switch>
  );
};

export default Routes;