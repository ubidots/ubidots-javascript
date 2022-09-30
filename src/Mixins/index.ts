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

