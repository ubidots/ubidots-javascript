import {
  ArrayFilter,
  BooleanFilter,
  DateFilter,
  IDFilters,
  NumberFilter,
  StringFilter,
} from '../../Filters/FilterBuilders';
import { Buildable } from '../../Builder/Builder';
import { Device } from './device.model';
import UbidotsObject from '../common/UbidotsObject';
import Api from '../../Api/Api';
import { ICreate } from '../../Builder/ICreatable';

type FilterTypes =
  typeof StringFilter
  | typeof IDFilters
  | typeof BooleanFilter
  | typeof NumberFilter
  | typeof ArrayFilter;


class DeviceObject extends UbidotsObject<Device> {

  protected data: Partial<Device> = {};
  protected objectName: string = 'devices';
  protected gettable: (keyof Device)[] = ['properties', 'label', 'description', 'id', 'isActive', 'lastActivity', 'name', 'organization', 'tags', 'url', 'variables', 'variablesNumber'];


  constructor(data: Partial<Device>) {
    super();
    this.createProperties();
    this.data = data;
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

  create(data: Partial<Device>): Promise<any> {
    return Api.post(this.entity, data);
  }
}
