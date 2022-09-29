import { UbidotsResponse } from '../Api/auth.models';
import { Device } from '../entities/devices/device.model';
import { BuildManager } from '../Builder/Builder';
import Api from '../Api/Api';

export const MixinExecutor = (superclass: any) => class extends superclass {

  public async get(): Promise<UbidotsResponse<Device[]>> {
    const response = await Api.get<Device[]>(`${BuildManager.entity}?`, { params: BuildManager.params });
    // On fetch
    BuildManager.params = {};
    return response;
  }
};


export const MixinContainable = (superClass: any) => class extends superClass {
  public contains(value: string, exact = false) {

    const contains = exact ? '__contains' : '__icontains';

    BuildManager.params[`${BuildManager.field}${contains}`] = value;
    return this;
  }
};
