import axios from 'axios';
import Token from './Token';

interface IAuth {
  token?: string;
  apiKey?: string;
}


// auth
class Auth {
  //Token should be here
  static #instance: Auth;
  #tokenAuth: Token = '';


  static getInstance(): Auth {
    if (!Auth.#instance) {
      Auth.#instance = new Auth();
    }

    return Auth.#instance;
  }


  async authenticate({ apiKey }: IAuth) {
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

    Token.setToken(data.data.token);
    return data.data.token;
  }
}


export default Auth;
