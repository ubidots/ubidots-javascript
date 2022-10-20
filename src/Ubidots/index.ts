import Api from '../Api/Api';
import { DeviceObject, Devices } from '../entities/devices';
import { Device } from '../entities/devices/device.model';

class Ubidots {
  static #devices = new Devices();

  // Filters and sorters

  static get devices() {
    return this.#devices;
  }


  static Device(data: Partial<Device>) {
    return new DeviceObject(data);
  }
}

export default Ubidots;
