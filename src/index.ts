import Api from './Api/Api';
import Auth from './Auth/Auth';
import Ubidots from './Ubidots';
import { Device } from './entities/devices/device.model';
import { UbidotsResponse } from './Api/auth.models';

async function main() {

  const AuthInstance = Auth.getInstance();

  await AuthInstance.authenticate({ apiKey: 'API-KEY' });
  const devices: UbidotsResponse<Device[]> = await Ubidots.getDevices();
  const { results } = devices;
  console.log(results.map(({ label }) => label));
}

main();
