import axios, { AxiosRequestConfig } from 'axios';
import Token from '../Auth/Token';
import { UbidotsResponse } from './auth.models';
import Auth from '../Auth/Auth';

const ApiInstance = axios.create({
  baseURL: `https://industrial.api.ubidots.com/api/`,
});


ApiInstance.interceptors.request.use(async config => {
  const token = Token.getToken();
  if (!token) {
    const authenticated = await Auth.getInstance().temporalAuth();
    if (!authenticated) throw new Error('Token is required, configure it with Auth.authenticate(Token) or Token.setToken(Token)');
  }

  return { ...config, headers: { ...config.headers, 'X-Auth-Token': token } };
});

type ApiVersion = 'v1.6' | 'v2.0';

interface UbidotsRawResponse {
  data: any;
}

class Api {

  static #version: ApiVersion = 'v2.0';

  static setVersion(version: ApiVersion) {
    Api.#version = version;
  }


  static async get<T>(url: string, config?: AxiosRequestConfig<any>): Promise<UbidotsResponse<T>> {
    //TODO: Handle response and return IApiData in all responses
    const response = await ApiInstance.get<UbidotsResponse<T>>(`${this.#version}/${url}`, config);
    return {
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      results: response.data.results,
    };
  }

  static async getRawResponse<T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> {
    //TODO: Handle response and return IApiData in all responses
    const response: any = await ApiInstance.get<T>(`${this.#version}/${url}`, config) as T;
    return response.data;
  }

  static async post(url: string, data?: object, config?: object) {
    const response: any = await ApiInstance.post(`${this.#version}/${url}`, data, config);
    return response.data;
  }
}


export default Api;
