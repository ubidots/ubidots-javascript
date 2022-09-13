class Token {
  static #token = '';

  static setToken(token: string) {
    Token.#token = token;
  }

  static getToken() {
    return Token.#token;
  }
}

export default Token;
