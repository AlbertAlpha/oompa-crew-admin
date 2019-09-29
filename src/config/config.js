const config = {
  env: process.env.REACT_APP_ENV,
  debug: process.env.REACT_APP_DEBUG,
  endpointServices: {
    user: process.env.REACT_APP_USER_SERVICE_URL
  }
};

export default config;
