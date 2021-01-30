import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Main, Replacements, SpareParts } from './components';

const Routes = () => {
	return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/replacements" component={Replacements} />
      <Route exact path="/spare-parts" component={SpareParts} />
    </Switch>
  );
};

export default Routes;