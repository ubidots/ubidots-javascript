import {
  ArrayFilter,
  BooleanFilter,
  DateFilter,
  IDFilters,
  NumberFilter,
  StringFilter,
} from '../../Filters/FilterBuilders';
import { Buildable, BuildManager } from '../../Builder/Builder';
import { Device } from './device.model';
import UbidotsObject from '../common/UbidotsObject';
import Api from '../../Api/Api';
import { ICreate } from '../../Builder/ICreatable';
import { FilterTypes } from '../common/types';
import { Variables } from '../Variables';


export class DeviceObject extends UbidotsObject<Device> {

  public data: Partial<Device> = {};
  protected apiName: string = 'devices';
  protected gettable: (keyof Device)[] = ['properties', 'label', 'description', 'id', 'isActive', 'lastActivity', 'name', 'organization', 'tags', 'url', 'variablesNumber'];


  constructor(data: Partial<Device>) {
    super();
    this.createProperties();
    this.data = data;
  }


  get variables(): Variables {
    return this.hasMany<Variables>(Variables);
  }
}

export class Devices extends Buildable implements ICreate {
  protected entity: string = 'devices';
  // Just to test
  fieldsWithFilters: Record<string, FilterTypes> = {
    id: IDFilters,
    name: StringFilter,
    label: StringFilter,
    description: StringFilter,
    context: StringFilter,
    isActive: BooleanFilter,
    tags: ArrayFilter,
    variablesCount: NumberFilter,
    status: StringFilter,
    last_activity: DateFilter,
    created_at: DateFilter,
    updated_at: DateFilter,
  };

  public where(field: string) {
    return super._where(field, DeviceObject);
  }

  public all() {
    return super._all(DeviceObject);
  }


  create(data: Partial<Device>): Promise<any> {
    return Api.post(this.entity, data);
  }
}
