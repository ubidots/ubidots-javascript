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
import { Constructable } from '../../index';
import { BaseFilter } from '../Builder/BaseFilter';


export class StringFilter<T> extends mix(BaseFilter).with(MixinContainable, MixinEqualable, MixinEndsWith, MixinStartsWith, MixinIsNull) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class IDFilters<T> extends mix(BaseFilter).with(MixinEqualable) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class BooleanFilter<T> extends mix(BaseFilter).with(MixinEqualable, MixinIsNull) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class NumberFilter<T> extends mix(BaseFilter).with(MixinEqualable, MixinIsNull, MixinGT, MixinGTE, MixinLT, MixinLTE) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class ArrayFilter<T> extends mix(BaseFilter).with(MixinContainable, MixinIsNull, MixinContainedBy, MixinLen) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}

export class DateFilter<T> extends mix(BaseFilter).with(MixinEqualable, MixinDates, MixinIsNull) {
  constructor(type: Constructable<T>) {
    super(type);
  }
}
