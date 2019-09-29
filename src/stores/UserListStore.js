import { action, decorate, observable } from 'mobx';
import UserService from "../services/UserService";

class UserListStore {

  constructor() {
    console.log("Created new instance of UserListStore!");
  }

  listState = {
    loading: false,
    entries: [],
    numEntries: null,
    page: 1,
    filter: {
      profession: '',
      name: ''
    }
  };

  // Public Actions that modify state
  search(filter) {
    const params = {
      profession: filter.profession || null,
      name: filter.name || null
    };
    this.listState.loading = true;
    this.listState.filter = filter;
    UserService.getUsers(params).then(users => {
      this.listState.entries = users;
      this.listState.numEntries = users.length;
      this.listState.loading = false;
    })
    .catch(err => {
      this.listState.numEntries = null;
      this.listState.loading = false;
    });
  }
}

decorate(UserListStore, {
  // observable state values
  // filter: observable,
  listState: observable,
  // public actions
  search: action
});

export default UserListStore;
