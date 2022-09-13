import Api from '../Api/Api';
import Devices from '../entities/devices';

class Ubidots {
  static getDevices() {
    return Devices.getAll();
  }
}

export default Ubidots;
