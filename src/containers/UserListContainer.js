import React, { Component } from 'react';
import { observer } from 'mobx-react';
import "../resources/stylesheets/users.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class UserListContainer extends Component {

  constructor(props) {
    super(props);
    this.store = props.store;
  }

  onSubmit = () => {
    console.log('Form submit');
  };

  render() {
    const listState = this.store.listState;
    return (
      <div className="mb-3">
        <h3>Find Oompa Loompa's Crew</h3>

        <form onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-auto">
                <label htmlFor="search">Search (profession/name)</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon="search-plus"/></span>
                  </div>
                  <input id="search" type="text" className="form-control"/>
                </div>
              </div>
            </div>
        </form>
        <div className="mb-3">
          <button type="button" className="btn btn-primary" disabled={listState.loading} onClick={this.submit}>
            {listState.loading ? 'Searching...' : 'Search'}
          </button>
          <span className="text-muted ml-2">
              {listState.numEntries !== null ? listState.numEntries + ' user/s found' : ''}
          </span>
        </div>

      </div>
    );
  }
}

export default observer(UserListContainer);
