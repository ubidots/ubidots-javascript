import Auth from './Auth/Auth';
import Ubidots from './Ubidots/index';
import { DeviceObject } from './entities/devices';
import { VariableObject } from './entities/Variables';

(async () => {
  const AuthInstance = Auth.getInstance();
  await AuthInstance.authenticate('BBFF-QUcQ2EnNxNt9WIKyDWjiZ8HH7EhxDF');
  const device = Ubidots.devices.where('label').contains('cats').orderBy('id').debug();

  console.log(device);
})();
