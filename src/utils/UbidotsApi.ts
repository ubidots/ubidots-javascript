import axios from 'axios';
import { UBIDOTS } from '../constants/API.constants';
import Auth from '../Auth';

const ApiInstance = axios.create({
  baseURL: `http://industrial.api.ubidots.com/api/${UBIDOTS.API_VERSION}/`,
});


ApiInstance.interceptors.request.use(async config => {
  return { ...config, headers: { ...config.headers, 'X-Auth-Token': await Auth.getToken() } };
});


class UbidotsApi {
  static async get(url: string, params?: any) {
    const response: any = await ApiInstance.get(url, {
      params,
    });
    return response.data;
  }

  static async post(url: string, data?: any, config?: any) {
    const response: any = await ApiInstance.post(url, data, config);
    return response.data;
  }
}


export default UbidotsApi;
