import Auth from './Auth/Auth';
import Ubidots from './Ubidots/index';
import { Device } from './entities/devices/device.model';
import { StringFilter } from './Filters/FilterBuilders';
import { Devices } from './entities/devices';

(async () => {
  const AuthInstance = Auth.getInstance();

  await AuthInstance.temporalAuth({ apiKey: 'BBFF-61a88d34eb81a3000edc6849a37dc40e1fb' });
  const devices: Device[] = await Ubidots.devices.where('name').pick(['name']).orderBy('label').get();
  const [device] = devices;
  console.log('Device with pick', device);
  console.log('Fetching device data', await device.properties);
  console.log('Device with data already fetched', device);
})();
