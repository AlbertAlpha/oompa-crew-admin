import {action, computed, configure, decorate, observable, runInAction} from 'mobx';
import UserService from "../services/UserService";
import LocalStorageService from "../services/LocalStorageService";

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
    numEntries: 0,
    page: 0,
    totalPages: 0,
    // search functionality
    results: [],
    currentSearchValue: ''
  };

  //////////////////////////// ACTIONS /////////////////////////////////////////////////////////////////////////////////

  loadStoredState() {
    const key = LocalStorageService.USER_LIST_KEY;
    const storedState = LocalStorageService.getData(key, 1, 'days');
    if (!storedState) return false;
    // update list state with stored values
    this.listState = {
      ...this.listState,
      ...storedState
    };
    return true;
  }

  getUsers(page) {
    page = page ? page : this.listState.page + 1;
    this.listState.loading = true;
    return UserService.getUsers(page).then(users => {
      runInAction('getUsers', () => {
        this.listState.entries = this.listState.entries.concat(users.results);
        this.listState.numEntries =this.listState.entries.length;
        this.listState.page = users.current;
        this.listState.totalPages = users.total;
        this.listState.loading = false;
        // Store state for later use
        LocalStorageService.storeData(LocalStorageService.USER_LIST_KEY, {
          entries: this.listState.entries,
          numEntries: this.listState.numEntries,
          page: this.listState.page,
          totalPages: this.listState.totalPages,
          currentSearchValue: this.listState.currentSearchValue
        });
      });
    });
  }

  searchUsers(value) {
    value = (value === undefined) ? this.listState.currentSearchValue : value;
    this.listState.currentSearchValue = value;

    if (!value) {
      this.listState.results = this.listState.entries; // all items
      return;
    }

    const searchValue = value.toLowerCase();
    this.listState.results = this.listState.entries.filter(user => {
      if (!value) return true;
      if (user.first_name.toLowerCase().includes(searchValue)) return true;
      if (user.last_name.toLowerCase().includes(searchValue)) return true;
      if (user.profession.toLowerCase().includes(searchValue)) return true;
      return false;
    });
  }

  getUserDetails(userId) {
    const key = LocalStorageService.USER_DETAILS_KEY + userId;
    const storedUser = LocalStorageService.getData(key, 1, 'days');
    if (storedUser) {
      console.log(`User ${userId} found in local storage!`);
      return Promise.resolve(storedUser);
    } else {
      return UserService.getUser(userId)
        .then(user => {
          LocalStorageService.storeData(key, user);
          return user;
        });
    }
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
  loadStoredState: action,
  getUsers: action,
  searchUsers: action,
  getUserDetails: action,
  // computed values derived from state
  hasMoreUsersToLoad: computed
});

export default UserListStore;
