import Api from '../Api/Api';
import { Devices } from '../Builder/Builder';

class Ubidots {
  static #devices = new Devices();

  // Filters and sorters

  static Devices() {
    return this.#devices;
  }
}

export default Ubidots;
