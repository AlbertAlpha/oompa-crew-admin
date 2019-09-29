import { AuthApiClient } from './AuthApiClient';
import config from "../config/config";

const client = new AuthApiClient(config.endpointServices.catalog);
const UserService = {
  getUsers(page) {
    return client.get('/', {
      params: { page }
    })
  },
  getUser(userId) {
    return client.get(`/${userId}`);
  },
};

export default UserService;
