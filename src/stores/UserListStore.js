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
    search: {
      currentValue: null,
      results: []
    }
  };

  fetchUsers(page = 1) {
    this.listState.loading = true;
    UserService.getUsers(page).then(users => {
      this.listState.entries = users.results;
      this.listState.numEntries = users.results.length;
      this.listState.loading = false;
      this.searchUsers(null);
    });
  }

  // Public Actions that modify state
  searchUsers(value) {

    if (!value) {
      this.listState.search.results = this.listState.entries; // all items
      return;
    }
    const searchValue = value.toLowerCase();
    this.listState.search.results = this.listState.entries.filter(user => {
      if (!value) return true;
      if (user.first_name.toLowerCase().includes(searchValue)) return true;
      if (user.last_name.toLowerCase().includes(searchValue)) return true;
      if (user.profession.toLowerCase().includes(searchValue)) return true;
      return false;
    });
  }
}

decorate(UserListStore, {
  // observable state values
  listState: observable,
  // public actions
  fetchUsers: action,
  searchUsers: action
});

export default UserListStore;
