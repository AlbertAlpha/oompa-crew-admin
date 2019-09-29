import React, { Component, Suspense } from 'react';
import ReactNotification from 'react-notifications-component';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../config/routes';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import Page404 from './Page404';
import Loading from './Loading';
import config from '../config/config';
import NotificationService from '../services/NotificationService';
import AppStore from '../stores/AppStore';

import "react-notifications-component/dist/theme.css";

class AppMain extends Component {

  constructor(props) {
    super(props);
    this.debugEnabled = config.debug === 'true';
    this.notificationRef = React.createRef();
    this.appStore = AppStore;
    NotificationService.initialize(this.notificationRef);
  }

  loading = () => <Loading />;

  render() {
    return (
      <>
      <AppHeader key="header"/>
      <main key="main" className="main">
        <ReactNotification ref={this.notificationRef} />
        <div className="container-fluid">
          <Suspense fallback={this.loading()}>
            <Switch>
              {routes.map(route => {
                return route.component ? (
                  <Route
                    key={route.key}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <route.component {...props} store={this.appStore.getStoreForRoute(route.key)} />
                    )} />
                ) : null;
              })}
              <Redirect exact from="/" to="/users" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </div>
      </main>
      <AppFooter key="footer"/>
      {this.debugEnabled && null}
      </>
    )
  }
}

export default AppMain;
