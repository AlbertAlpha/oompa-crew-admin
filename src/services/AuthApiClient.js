import axios from 'axios';

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getApiClient = (baseUrl = null) => {

  const options = {
    baseURL: baseUrl,
    timeout: 1000 * 10, // Wait for 10 seconds
    withCredentials: false,   // Issue CORS requests with credentials
    headers: {
      "accept-language": 'en'
    }
  };

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => {
      // Add authentication layer here
      return requestConfig;
    },
    (requestError) => {
      return Promise.reject(requestError);
    },
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    (error) => {
      return Promise.reject(error);
    },
  );

  return client;
};

class AuthApiClient {
  constructor(baseUrl = null) {
    this.client = getApiClient(baseUrl);
  }

  get(url, conf = {}) {
    return this.client.get(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => {
        console.error(error);
        return Promise.reject(error.response || error.message)
      });
  }

  delete(url, conf = {}) {
    return this.client.delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => {
        console.error(error);
        return Promise.reject(error.response || error.message)
      });
  }

  head(url, conf = {}) {
    return this.client.head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error.response || error.message));
  }

  options(url, conf = {}) {
    return this.client.options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error.response || error.message));
  }

  post(url, data = {}, conf = {}) {
    return this.client.post(url, data, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response || error.message));
  }

  put(url, data = {}, conf = {}) {
    return this.client.put(url, data, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response || error.message));
  }

  patch(url, data = {}, conf = {}) {
    return this.client.patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error.response || error.message));
  }
}

export { AuthApiClient };
