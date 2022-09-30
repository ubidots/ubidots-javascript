import { UbidotsResponse } from '../Api/auth.models';
import { Device } from '../entities/devices/device.model';
import { BuildManager } from '../Builder/Builder';
import Api from '../Api/Api';


export const MixinContainable = (superClass: any) => class extends superClass {
  public contains(value: string, ignoreCase = false) {

    const contains = ignoreCase ? '__icontains' : '__contains';

    BuildManager.params[`${BuildManager.field}${contains}`] = value;
    return this;
  }
};

export const MixinEqualable = (superClass: any, ignoreCae = false) => class extends superClass {
  public equal(value: string) {
    const suffix = ignoreCae ? '' : '__iexact';
    BuildManager.params[`${BuildManager.field}${suffix}`] = value;
    return this;
  }
};


export const MixinStartsWith = (superClass: any) => class extends superClass {
  public startsWith(value: string, ignoreCase = false) {
    const suffix = ignoreCase ? '__istartswith' : '__startswith';
    BuildManager.params[`${BuildManager.field}${suffix}`] = value;
    return this;
  }
};

export const MixinEndsWith = (superClass: any) => class extends superClass {
  public endsWith(value: string, ignoreCase = false) {
    const suffix = ignoreCase ? '__iendswith' : '__endswith';
    BuildManager.params[`${BuildManager.field}${suffix}`] = value;
    return this;
  }
};


export const MixinIsNull = (superClass: any) => class extends superClass {
  public isNull() {
    BuildManager.params[`${BuildManager.field}__isnull`] = 'true';
    return this;
  }
};

export const MixinGT = (superClass: any) => class extends superClass {
  public gt(value: string) {
    BuildManager.params[`${BuildManager.field}__gt`] = value;
    return this;
  }
};

export const MixinGTE = (superClass: any) => class extends superClass {
  public gte(value: string) {
    BuildManager.params[`${BuildManager.field}__gte`] = value;
    return this;
  }
};


export const MixinLT = (superClass: any) => class extends superClass {
  public lt(value: string) {
    BuildManager.params[`${BuildManager.field}__lt`] = value;
    return this;
  }
};

export const MixinLTE = (superClass: any) => class extends superClass {
  public lte(value: string) {
    BuildManager.params[`${BuildManager.field}__lte`] = value;
    return this;
  }
};

export const MixinLen = (superClass: any) => class extends superClass {
  public len(value: number) {
    BuildManager.params[`${BuildManager.field}__len`] = value;
    return this;
  }
};

export const MixinContainedBy = (superClass: any) => class extends superClass {
  public containedBy(value: string) {
    BuildManager.params[`${BuildManager.field}__contained_by`] = value;
    return this;
  }
};

