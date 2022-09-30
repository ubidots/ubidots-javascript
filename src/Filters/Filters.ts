import mix from '../utils/applyMixins';
import {
  MixinContainable, MixinContainedBy, MixinDates,
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
    BuildManager.reset();
    return response;
  }

  public orderBy(field: string, order: 'asc' | 'desc' = 'asc') {
    const preffix = order === 'asc' ? '' : '-';

    BuildManager.addRawQuery(`${preffix}sort_by`, field);
    return this;
  }

  public pick(fields: string[]) {
    BuildManager.addRawQuery('fields', fields.join(','));
    return this;
  }

  public paginate(page: number, pageSize: number) {
    BuildManager.addRawQuery('page', page);
    BuildManager.addRawQuery('page_size', pageSize);
    return this;
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

export class DateFilter extends mix(BaseFilter).with(MixinEqualable, MixinDates, MixinIsNull) {

}
