import mix from '../utils/applyMixins';
import {
  MixinContainable, MixinContainedBy,
  MixinEndsWith,
  MixinEqualable,
  MixinGT, MixinGTE,
  MixinIsNull, MixinLen,
  MixinLT, MixinLTE,
  MixinStartsWith,
} from '../Mixins';
import { UbidotsResponse } from '../Api/auth.models';
import { Device } from '../entities/devices/device.model';
import Api from '../Api/Api';
import { BuildManager } from '../Builder/Builder';


export class BaseFilter {
  public async get(): Promise<UbidotsResponse<Device[]>> {
    const response = await Api.get<Device[]>(`${BuildManager.entity}?`, { params: BuildManager.params });
    // On fetch
    BuildManager.params = {};
    return response;
  }
}


export class StringFilter extends mix(BaseFilter).with(MixinContainable, MixinEqualable, MixinEndsWith, MixinStartsWith, MixinIsNull) {
}

export class IDFilters extends mix(BaseFilter).with(MixinEqualable) {
}

export class BooleanFilter extends mix(BaseFilter).with(MixinEqualable, MixinIsNull) {
}

export class NumberFilter extends mix(BaseFilter).with(MixinEqualable, MixinIsNull, MixinGT, MixinGTE, MixinLT, MixinLTE) {
}

export class ArrayFilter extends mix(BaseFilter).with(MixinContainable, MixinIsNull, MixinContainedBy, MixinLen) {
}

