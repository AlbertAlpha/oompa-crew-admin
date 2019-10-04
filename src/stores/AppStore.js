import { decorate } from 'mobx';
import UserListStore from './UserListStore';

class AppStore {

  constructor() {
    console.log("Created new instance of AppStore!");
    this.userListStore = new UserListStore();
  }

  /**
   * TODO: This is not the most elegant way to pass store to containers,
   * TODO: maybe it could be substituted by using context in all components
   */
  getStoreForRoute(key) {
    switch (key) {
      case 'users': return this.userListStore;
      case 'user-details': return this.userListStore;
      default: return null;
    }
  }
}

decorate(AppStore, {
  // observable state values
  // filter: observable,
  // listState: observable,
  // public actions
  // search: action
});

export default new AppStore();
