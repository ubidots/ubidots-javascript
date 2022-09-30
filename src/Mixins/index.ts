import { UbidotsResponse } from '../Api/auth.models';
import { Device } from '../entities/devices/device.model';
import { BuildManager } from '../Builder/Builder';
import Api from '../Api/Api';
import { NumberFilter } from '../Filters/Filters';


export const MixinContainable = (superClass: any) => class extends superClass {
  public contains(value: string, ignoreCase = false) {
    const suffix = ignoreCase ? '__icontains' : '__contains';
    BuildManager.buildQuery(suffix, value);
    return this;
  }
};

export const MixinEqualable = (superClass: any) => class extends superClass {
  public is(value: string, ignoreCase: boolean = false) {
    const suffix = ignoreCase ? '' : '__iexact';
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

  public get year() {
    BuildManager.addField('year');
    return new NumberFilter();
  }

  public get month() {
    BuildManager.addField('month');
    return new NumberFilter();
  }

  public get day() {
    BuildManager.addField('day');
    return new NumberFilter();
  }

  public get week() {
    BuildManager.addField('week');
    return new NumberFilter();
  }

  public get hour() {
    BuildManager.addField('hour');
    return new NumberFilter();
  }

  public get minute() {
    BuildManager.addField('minute');
    return new NumberFilter();
  }

  public get second() {
    BuildManager.addField('second');
    return new NumberFilter();
  }
};
