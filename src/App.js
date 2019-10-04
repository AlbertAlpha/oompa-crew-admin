import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './layouts/Loading';
import icons from './config/icons';

import './App.scss';

const loading = () => <Loading />;
icons.initialize();

// Containers / Pages
const AppMain = Loadable({
  loader: () => import('./layouts/AppMain'),
  loading
});

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" name="Home" component={AppMain} />
        </Switch>
      </Router>
    );
  }
}

export default App;
