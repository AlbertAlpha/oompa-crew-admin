import moment from 'moment';

class Utils {

  // YYYY-MM-DD HH:mm:ss (optional end with +0000 for UTC)
  static dateTimeRx = new RegExp(/^(\d{4})-0?(\d+)-0?(\d+)[ ]0?(\d+):0?(\d+):0?(\d+)( \+0000)?$/);
  // Unix timestamp (optional end with +0000 for UTC)
  static dateTimeUnixRx = new RegExp(/^(\d+)( \+0000)?$/);

  static parseDate(value) {

    if (value === undefined || value === null || value === '') {
      return moment.invalid();
    } else if (moment.isMoment(value)) {
      return value;
    } else if (Object.prototype.toString.call(value) === '[object Date]') {
      return moment(value);
    } else if (this.dateTimeRx.test(value)) {
      if (value.endsWith('+0000')) {
        return moment(value, 'YYYY-MM-DD HH:mm:ss Z').local();
      } else {
        return moment(value, 'YYYY-MM-DD HH:mm:ss');
      }
    } else if (this.dateTimeUnixRx.test(value)) {
      return value.endsWith('+0000') ? moment(value, 'x') : moment(value, 'x');
    } else if (moment(value, moment.ISO_8601).isValid()) { // ISO 8601 strings
      return moment(value).local();
    } else if (value.endsWith('+0000')) { // parse as UTC timezone and convert to local timezone
      return moment(value, 'MMM DD, YYYY h:mm:ss A Z').local();
    } else {
      return moment(value, 'MMM DD, YYYY h:mm:ss A');
    }
  }
  static parseCurrency(amount, defaultValue = 0.00) {
    return amount ? Math.round(parseFloat(amount) * 100) / 100 : defaultValue;
  }
  static formatCurrency(amount) {
    return (amount || amount === 0) ? parseFloat(amount).toFixed(2) : null;
  }
  static formatDate(value) {
    const mDate = this.parseDate(value);
    return mDate.format('DD/MM/YYYY HH:mm:ss');
  }
  static copy(obj) {
    return obj ? JSON.parse(JSON.stringify(obj)) : obj;
  }
}

export default Utils;
