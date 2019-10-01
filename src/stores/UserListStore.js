import {action, computed, configure, decorate, observable, runInAction} from 'mobx';
import UserService from "../services/UserService";

// don't allow state modifications outside actions
configure({enforceActions: "observed"});

class UserListStore {

  constructor() {
    console.log("Created new instance of UserListStore!");
  }

  ////////////////////////// STATE /////////////////////////////////////////////////////////////////////////////////////

  listState = {
    loading: false,
    entries: [],
    numEntries: null,
    page: 1,
    totalPages: 0,
    // search functionality
    results: [],
    currentSearchValue: ''
  };

  //////////////////////////// ACTIONS /////////////////////////////////////////////////////////////////////////////////

  fetchUsers(page) {
    page = page ? page : this.listState.page + 1;
    this.listState.loading = true;
    return UserService.getUsers(page).then(users => {
      runInAction('getUsers', () => {
        this.listState.entries = this.listState.entries.concat(users.results);
        this.listState.numEntries =this.listState.entries.length;
        this.listState.page = users.current;
        this.listState.totalPages = users.total;
        this.listState.loading = false;
      });
    });
  }

  searchUsers(value) {
    if (!value) {
      this.listState.results = this.listState.entries; // all items
      return;
    }
    const searchValue = value.toLowerCase();
    this.listState.currentSearchValue = value;
    this.listState.results = this.listState.entries.filter(user => {
      if (!value) return true;
      if (user.first_name.toLowerCase().includes(searchValue)) return true;
      if (user.last_name.toLowerCase().includes(searchValue)) return true;
      if (user.profession.toLowerCase().includes(searchValue)) return true;
      return false;
    });
  }

  ///////////////////////////// COMPUTED VALUES ////////////////////////////////////////////////////////////////////////

  get hasMoreUsersToLoad() {
    return this.listState.page < this.listState.totalPages;
  }
}

decorate(UserListStore, {
  // observable state values
  listState: observable,
  // public actions
  fetchUsers: action,
  searchUsers: action,
  // computed values derived from state
  hasMoreUsersToLoad: computed
});

export default UserListStore;
