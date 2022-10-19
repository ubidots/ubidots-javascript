import Auth from './Auth/Auth';
import Ubidots from './Ubidots/index';
import { Device } from './entities/devices/device.model';
import { StringFilter } from './Filters/FilterBuilders';
import { Devices } from './entities/devices';

(async () => {
  const AuthInstance = Auth.getInstance();

  await AuthInstance.authenticate('RWFNJWjLeOLUmMfolcY7NFWHYUOVt9');
  const devices: Device[] = await Ubidots.devices.where('name').pick(['name']).orderBy('label').get();

  try {
    const response = await Ubidots.devices.create({ name: 'testDeviceFromCli', label: 'testDeviceFromCli' });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
})();
