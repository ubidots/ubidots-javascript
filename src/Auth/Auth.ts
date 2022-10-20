import axios from 'axios';
import Token from './Token';
import { util } from 'prettier';
import skipToLineEnd = util.skipToLineEnd;
import { API_BASE_URL } from '../config';

interface IAuth {
  apiKey?: string | null;
}


// auth
class Auth {
  //Token should be here
  static #instance: Auth;

  static getInstance(): Auth {
    if (!Auth.#instance) {
      Auth.#instance = new Auth();
    }

    return Auth.#instance;
  }


  async authenticate(token: string) {
    Token.setToken(token);
  }

  async temporalAuth({ apiKey = null }: IAuth = {}, customHeaders = {}) {
    if (!apiKey) {
      throw new Error('API key is required');
    }


    const data = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/v1.6/auth/token`,
      headers: {
        'x-ubidots-apikey': apiKey,
      },
      ...customHeaders,
    });

    Token.setToken(data.data.token);
    return !!data.data.token;
  }
}


export default Auth;
