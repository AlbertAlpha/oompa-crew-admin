import moment from "moment";

class LocalStorageService {

  static USER_LIST_KEY = "user-list";
  static USER_DETAILS_KEY = "user-details-";

  static getData(key, expirationTimeValue, expirationTimeUnits) {
    const entryStr = localStorage.getItem(key);

    // no data found on local storage
    if (entryStr === null) return null;

    // no need to check expiration, return stored data
    const entry = JSON.parse(entryStr);
    if (!expirationTimeValue) return entry.data;

    // check expiration date
    const mStoredDate = moment(entry.storedDate);
    const mMinValidDate = moment().subtract(expirationTimeValue, expirationTimeUnits);
    if (mStoredDate.isBefore(mMinValidDate)) return null;
    else return entry.data;
  }

  static storeData(key, data) {
    const entry = {
      storedDate: moment().toISOString(),
      data: data
    };
    localStorage.setItem(key, JSON.stringify(entry));
  }

  // getUserList() {
  //   return this.getData(LocalStorageService.USER_LIST_KEY, 1, 'days');
  // }
  // getUser(userId) {
  //   const key = LocalStorageService.USER_DETAILS_KEY + userId;
  //   return this.getData(key,  1, 'days');
  // }
}

export default LocalStorageService;
