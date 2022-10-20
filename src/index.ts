import Auth from './Auth/Auth';
import Ubidots from './Ubidots/index';
import { Device } from './entities/devices/device.model';
import { StringFilter } from './Filters/FilterBuilders';
import { DeviceObject, Devices } from './entities/devices';
import { VariableObject } from './entities/Variables';

(async () => {
  const AuthInstance = Auth.getInstance();
  await AuthInstance.authenticate('BBFF-QUcQ2EnNxNt9WIKyDWjiZ8HH7EhxDF');
  const [device]: DeviceObject[] = await Ubidots.devices.all().pick(['name', 'label']).orderBy('label').get();
  const [variables]: VariableObject[] = await device.variables.all().get();

  try {
    console.log(await variables.device().refresh());

  } catch (e) {
    console.log(e);
  }
})();
