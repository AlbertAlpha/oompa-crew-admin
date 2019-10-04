class ExceptionManager {

  static getMessageForStatus(status) {
    switch (status) {
      case 400:
        return 'Credenciales no válidas';
      case 401:
        return 'Error de authenticación en la operación';
      case 503:
        return 'Servicio no disponible temporalmente';
      default:
        return null;
    }
  }

  static getMessageForErrorCode(errorCode, defaultMessage) {
    switch (errorCode) {
      case "ORD-035": return 'El código no es correcto o ya ha superado el límite diario';
      case "VER-004": return 'El validador configurado no puede validar este recinto o extra';
      default: return defaultMessage;
    }
  }

  static parseError(error, defaultMsg) {

    let message = defaultMsg || 'No se pudo procesar la operación.';
    let status = undefined;

    if (error instanceof Error) {
      message = error.message;
    } else if (error.message) {
      message = error.message;
      status = error.status;
    } else if (error.data && error.data.message) {
      message = this.getMessageForErrorCode(error.data.errorCode, error.data.message);
      status = error.data.status || error.data.code || error.status;
    } else if (error.data && error.data.exception) {
      message = this.getMessageForErrorCode(error.data.errorCode, error.data.exception);
      status = error.data.status || error.data.code || error.status;
    } else if (error.data && error.data.error_description) {
      message = error.data.error_description;
      status = error.data.status || error.data.code || error.status;
    } else if (error.data && typeof error.data === 'string') {
      try {
        const errorJson = JSON.parse(error.data); // raw output from http response
        message = errorJson.message;
        status = errorJson.status;
      } catch (e) {
        message = error; // single string error msg
      }
    } else if (typeof error === 'string') {
      message = error;
    } else if (error.status) {
      status = error.status;
      message = this.getMessageForStatus(error.status) || message;
    } else if (error === false || error === true) { // previously controlled error, do nothing
      return null;
    }

    return {status, message};
  }
}

export default ExceptionManager;
