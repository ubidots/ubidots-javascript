import Api from '../../Api/Api';
import { Device } from './device.model';
import { UbidotsResponse } from '../../Api/auth.models';


class Devices {
  public static async getAll(): Promise<UbidotsResponse<Device[]>> {
    return await Api.get<Device[]>('devices', {});
  }
}

export default Devices;
