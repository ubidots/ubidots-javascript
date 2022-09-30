import { UbidotsResponse } from '../Api/auth.models';
import { Device } from '../entities/devices/device.model';
import { BuildManager } from '../Builder/Builder';
import Api from '../Api/Api';


export const MixinContainable = (superClass: any) => class extends superClass {
  public contains(value: string, ignoreCase = false) {
    const suffix = ignoreCase ? '__icontains' : '__contains';
    BuildManager.buildQuery(suffix, value);
    return this;
  }
};

export const MixinEqualable = (superClass: any, ignoreCae = false) => class extends superClass {
  public equal(value: string) {
    const suffix = ignoreCae ? '' : '__iexact';
    BuildManager.buildQuery(suffix, value);
    return this;
  }
};


export const MixinStartsWith = (superClass: any) => class extends superClass {
  public startsWith(value: string, ignoreCase = false) {
    const suffix = ignoreCase ? '__istartswith' : '__startswith';
    BuildManager.buildQuery(suffix, value);
    return this;
  }
};

export const MixinEndsWith = (superClass: any) => class extends superClass {
  public endsWith(value: string, ignoreCase = false) {
    const suffix = ignoreCase ? '__iendswith' : '__endswith';
    BuildManager.buildQuery(suffix, value);
    return this;
  }
};


export const MixinIsNull = (superClass: any) => class extends superClass {
  public isNull() {
    BuildManager.buildQuery('__isnull', 'true');
    return this;
  }
};

export const MixinGT = (superClass: any) => class extends superClass {
  public gt(value: string) {
    BuildManager.buildQuery('__gt', value);
    return this;
  }
};

export const MixinGTE = (superClass: any) => class extends superClass {
  public gte(value: string) {
    BuildManager.buildQuery('__gte', value);
    return this;
  }
};


export const MixinLT = (superClass: any) => class extends superClass {
  public lt(value: string) {
    BuildManager.buildQuery('__lt', value);
    return this;
  }
};

export const MixinLTE = (superClass: any) => class extends superClass {
  public lte(value: string) {
    BuildManager.buildQuery('__lte', value);
    return this;
  }
};

export const MixinLen = (superClass: any) => class extends superClass {
  public len(value: number) {
    BuildManager.buildQuery('__len', value);
    return this;
  }
};

export const MixinContainedBy = (superClass: any) => class extends superClass {
  public containedBy(value: string) {
    BuildManager.buildQuery('__contained_by', value);
    return this;
  }
};


export const MixinDates = (superClass: any) => class extends superClass {
  field: string = '';

  public get year() {
    this.field = 'year';
    return this;
  }

  public get month() {
    this.field = 'month';
    return this;
  }

  public get day() {
    this.field = 'day';
    return this;
  }

  public get week() {
    this.field = 'week';
    return this;
  }

  public get hour() {
    this.field = 'hour';
    return this;

  }

  public get minute() {
    this.field = 'minute';
    return this;
  }

  public get second() {
    this.field = 'second';
    return this;
  }


  public gt(value: string) {
    BuildManager.buildQuery(`${this.field}__gt`, value);
    return this;
  }

  public lt(value: string) {
    BuildManager.buildQuery(`${this.field}__lt`, value);
    return this;
  }

  public lte(value: string) {
    BuildManager.buildQuery(`${this.field}__lte`, value);
    return this;
  }

  public gte(value: string) {
    BuildManager.buildQuery(`${this.field}__gte`, value);
    return this;
  }


  public is(value: string) {
    BuildManager.buildQuery('', value);
    return this;
  }
};
