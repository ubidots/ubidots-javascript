import Api from '../Api/Api';
import { DeviceObject, Devices } from '../entities/devices';
import { Device } from '../entities/devices/device.model';
import { VariableObject } from '../entities/Variables';
import { Variable } from '../entities/Variables/variable.model';

class Ubidots {
  static #devices = new Devices();

  // Filters and sorters

  static get devices() {
    return this.#devices;
  }


  static Device(data: Partial<Device>) {
    return new DeviceObject(data);
  }

  static Variable(data: Partial<Variable>) {
    return new VariableObject(data);
  }
}

export default Ubidots;
