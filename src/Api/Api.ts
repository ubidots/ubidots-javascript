import axios, { AxiosRequestConfig } from 'axios';
import Token from '../Auth/Token';
import { UbidotsResponse } from './auth.models';
import Auth from '../Auth/Auth';
import { API_BASE_URL } from '../config';

const ApiInstance = axios.create({
  baseURL: API_BASE_URL,
});


ApiInstance.interceptors.request.use(async config => {
  const token = Token.getToken();
  if (!token) {
    console.warn('Use Auth.authenticate() to avoid using your token in each request');
  }
  return { ...config, headers: { 'X-Auth-Token': token, ...config.headers } };
});

type ApiVersion = 'v1.6' | 'v2.0';


class Api {

  static #version: ApiVersion = 'v2.0';

  static setVersion(version: ApiVersion) {
    Api.#version = version;
  }

  static getVersion() {
    return Api.#version;
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

  static async put(url: string, data?: object, config?: object) {
    const response: any = await ApiInstance.put(`${this.#version}/${url}`, data, config);
    return response.data;
  }
}


export default Api;
