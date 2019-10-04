import ExceptionManager from '../utils/ExceptionManager';
class NotificationService {

  constructor() {
    console.log("Created new instance of NotificationService");
  }

  initialize(notificationRef) {
    console.log('NotificationService - initialize');
    this.ref = notificationRef;
  }

  notify = (msg, title, type) => {
    this.ref.current.addNotification({
      title: title || '',
      message: msg,
      type: type,
      insert: "top",
      container: "bottom-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 4000 },
      dismissable: { click: true },
      width: 400
    });
  };

  success = (msg, title) => this.notify(msg, title, 'success');
  info = (msg, title) => this.notify(msg, title, 'info');
  warning = (msg, title) => this.notify(msg, title, 'warning');
  error = (msg, title) => this.notify(msg, title,'danger');
  exception = (error, onlyReturnMessage = false) => {
    const parsedError = ExceptionManager.parseError(error);
    if (parsedError) this.error(parsedError.message, parsedError.status ? 'Error HTTP: ' + parsedError.status : null);
    return onlyReturnMessage ? parsedError.message : Promise.reject(error);
  };
}

export default new NotificationService();
