import { UBIDOTS } from '../constants/API.constants';
import axios from 'axios';

class Auth {
  static #token = '';

  static setToken(token: string) {
    Auth.#token = token;
  }

  static async getToken() {
    if (!Auth.#token) {
      return await Auth.authenticate();
    }

    return Auth.#token;
  }

  static async authenticate(apiKey: string | undefined = UBIDOTS.API_KEY) {
    if (!apiKey) {
      throw new Error('API key is required');
    }

    const data = await axios({
      method: 'POST',
      url: 'https://industrial.api.ubidots.com/api/v1.6/auth/token',
      headers: {
        'x-ubidots-apikey': apiKey,
      },
    });
    Auth.setToken(data.data.token);
    return data.data.token;
  }
}

export default Auth;