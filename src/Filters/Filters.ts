import mix from '../utils/applyMixins';
import {
  MixinContainable,
  MixinContainedBy,
  MixinDates,
  MixinEndsWith,
  MixinEqualable,
  MixinGT,
  MixinGTE,
  MixinIsNull,
  MixinLen,
  MixinLT,
  MixinLTE,
  MixinStartsWith,
} from '../Mixins';
import Api from '../Api/Api';
import { BuildManager } from '../Builder/Builder';
import { UbidotsResponse } from '../Api/auth.models';
import { Constructable } from '../../index';


export class BaseQuery<T> {
  #type: Constructable<T>;

  constructor(type: Constructable<T>) {
    this.#type = type;
  }

  public async get(): Promise<T[]> {
    const response = await Api.get<T[]>(`${BuildManager.entity}?`, { params: BuildManager.params });
    BuildManager.reset();
    const { results } = response;

    return results.map((item) => new this.#type(item));
  }

  public async getRaw(): Promise<UbidotsResponse<T>> {
    const response = await Api.get<T>(`${BuildManager.entity}?`, { params: BuildManager.params });
    BuildManager.reset();
    return response;
  }

  public orderBy(field: string, order: 'asc' | 'desc' = 'asc') {
    const preffix = order === 'asc' ? '' : '-';

    BuildManager.addRawQuery(`${preffix}sort_by`, field);
    return this;
  }

  public pick(fields: string[]) {
    BuildManager.addRawQuery('fields', [...fields, 'id'].join(','));
    return this;
  }

  public paginate(page: number, pageSize: number) {
    BuildManager.addRawQuery('page', page);
    BuildManager.addRawQuery('page_size', pageSize);
    return this;
  }
}


export class StringFilter<T> extends mix(BaseQuery).with(MixinContainable, MixinEqualable, MixinEndsWith, MixinStartsWith, MixinIsNull) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class IDFilters<T> extends mix(BaseQuery).with(MixinEqualable) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class BooleanFilter<T> extends mix(BaseQuery).with(MixinEqualable, MixinIsNull) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class NumberFilter<T> extends mix(BaseQuery).with(MixinEqualable, MixinIsNull, MixinGT, MixinGTE, MixinLT, MixinLTE) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class ArrayFilter<T> extends mix(BaseQuery).with(MixinContainable, MixinIsNull, MixinContainedBy, MixinLen) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class DateFilter<T> extends mix(BaseQuery).with(MixinEqualable, MixinDates, MixinIsNull) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}
