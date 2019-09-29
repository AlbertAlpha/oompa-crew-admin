import React, { Component } from 'react';
import { observer } from 'mobx-react';
import "../resources/stylesheets/users.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Utils from '../utils/Utils';

class UserListContainer extends Component {

  constructor(props) {
    super(props);
    this.store = props.store;
  }

  componentDidMount() {
    this.store.fetchUsers();
  }

  onChangeSearchValue = (event) => {
    const currentValue = event.target.value;
    console.log('Searching for ' + currentValue);
    this.store.searchUsers(currentValue);
  };

  render() {
    const listState = this.store.listState;
    return (
      <div className="mb-3">

        <div className="jumbotron jumbotron-fluid justify-content-md-center">
          <div className="container text-center">
            <h1 className="display-4">Find Oompa Loompa's Crew</h1>
            <p className="lead">There are more than 100k</p>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="input-group mb-3">
                <input id="search" type="text" className="form-control" placeholder="Search" onChange={this.onChangeSearchValue} />
                <div className="input-group-append">
                  <span className="input-group-text"><FontAwesomeIcon icon="search"/></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            {listState.search.results.map(user =>
              <div className="col-sm mb-4" key={user.id}>
                <div className="card mx-auto" style={{width: '18rem'}}>
                  <img src={user.image} className="card-img-top"  alt={user.name}/>
                  <div className="card-body">
                    <h5 className="card-title">{user.first_name + ' ' + user.last_name}</h5>
                    <p className="card-text">
                      {Utils.getGenderName(user.gender)}
                      <br />
                      {user.profession}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }
}

export default observer(UserListContainer);