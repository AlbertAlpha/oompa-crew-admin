import React, { Component } from 'react';
import { observer } from 'mobx-react';

import "../resources/stylesheets/users.scss";

class UserDetailsContainer extends Component {

  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return (
      <div className="row mb-3">

        <p>User Details Page</p>

      </div>
    );
  }
}

export default observer(UserDetailsContainer);
