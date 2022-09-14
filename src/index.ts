import Api from './Api/Api';
import Auth from './Auth/Auth';
import Ubidots from './Ubidots';
import { Device } from './entities/devices/device.model';
import { UbidotsResponse } from './Api/auth.models';

async function main() {

  const AuthInstance = Auth.getInstance();

  await AuthInstance.authenticate({ apiKey: 'BBFF-61a88d34eb81a3000edc6849a37dc40e1fb' });
  const devices: UbidotsResponse<Device[]> = await Ubidots.Devices().getAll();
  const { results } = devices;
  console.log(results);
  // console.log(results.map(({ label }) => label));
}

main();
