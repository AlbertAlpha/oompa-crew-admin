import React, { Component } from 'react';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserDetails from "../components/UserDetails";
import SearchInput from "../components/SearchInput";

class UserListContainer extends Component {

  constructor(props) {
    super(props);
    this.store = props.store;
  }

  componentDidMount() {
    const loaded = this.store.loadStoredState();
    if (loaded) {
      this.store.searchUsers();
    } else {
      this.store.getUsers().then(() => this.store.searchUsers(null));
    }
  }

  loadMoreUsers = () => {
    this.store.getUsers().then(() => this.store.searchUsers());
  };

  onChangeSearchValue = (currentValue) => {
    console.log('Searching for ' + currentValue);
    this.store.searchUsers(currentValue);
  };

  render() {
    const listState = this.store.listState;
    const hasMoreUsersToLoad = this.store.hasMoreUsersToLoad;
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
            <div className="col-5">
              <SearchInput
                initialValue={listState.currentSearchValue}
                onChangeSearchValue={this.onChangeSearchValue}
              />
            </div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={listState.entries.length} //This is important field to render the next data
          next={this.loadMoreUsers}
          hasMore={hasMoreUsersToLoad}
          loader={<h4>Loading more users...</h4>}
          endMessage={<p className="text-center">No more users to load.</p>}
        >
          <div className="container">
            <div className="row justify-content-center">
              {listState.results.map(user => <UserDetails key={user.id} user={user} />)}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default observer(UserListContainer);
