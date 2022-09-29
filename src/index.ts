import Api from './Api/Api';
import Auth from './Auth/Auth';
import Ubidots from './Ubidots/index';
import { Device } from './entities/devices/device.model';
import { UbidotsResponse } from './Api/auth.models';
import StringFilters from './Filters/StringFilter';

(async () => {
  const AuthInstance = Auth.getInstance();

  await AuthInstance.authenticate({ apiKey: 'BBFF-61a88d34eb81a3000edc6849a37dc40e1fb' });
  const devices: UbidotsResponse<Device[]> = await Ubidots.Devices().where<StringFilters>('name').contains('cats').get();
  const { results } = devices;
  console.log(results);

})();
