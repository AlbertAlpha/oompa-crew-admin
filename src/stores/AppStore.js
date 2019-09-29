import { decorate } from 'mobx';
import UserListStore from './UserListStore';

class AppStore {

  constructor() {
    console.log("Created new instance of AppStore!");
    this.userListStore = new UserListStore();
  }

  /**
   * TODO: This could be substituted by using context in all components
   * TODO: but it will require to migrate from class components to functional components
   */
  getStoreForRoute(key) {
    switch (key) {
      case 'users': return this.userListStore;
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
