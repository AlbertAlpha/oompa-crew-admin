import React from 'react';
import AppMain from '../layouts/AppMain';

// Lazy load routed containers
const UserListContainer = React.lazy(() => import('../containers/UserListContainer'));
const UserDetailsContainer = React.lazy(() => import('../containers/UserDetailsContainer'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, key: 'home', name: 'Home', component: AppMain },
  { path: '/users', exact: true, key: 'users', name: 'Users', component: UserListContainer },
  { path: '/users/:userId', exact: true, key: 'user-details', name: 'User Details', component: UserDetailsContainer }
];

export default routes;
