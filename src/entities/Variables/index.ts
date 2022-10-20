import UbidotsObject from '../common/UbidotsObject';
import { Device } from '../devices/device.model';
import { Buildable } from '../../Builder/Builder';
import { ICreate } from '../../Builder/ICreatable';
import { FilterTypes } from '../common/types';
import {
  ArrayFilter,
  BooleanFilter,
  DateFilter,
  IDFilters,
  NumberFilter,
  StringFilter,
} from '../../Filters/FilterBuilders';
import Api from '../../Api/Api';
import { Variable } from './variable.model';
import { DeviceObject } from '../devices';


export class VariableObject extends UbidotsObject<Variable> {

  public data: Partial<Variable> = {};
  protected apiName: string = 'variables';
  protected gettable: (keyof Variable)[] = ['properties', 'label', 'description', 'device', 'lastActivity', 'name', 'tags', 'url'];


  constructor(data: Partial<Variable>) {
    super();
    if (!data.device?.label || !data.label) {
      throw new Error('Device and variable label is required');
    }

    this.createProperties();
    this.data = data;
  }

  device(): DeviceObject {
    return <DeviceObject>this.belongsTo(DeviceObject, 'device');
  }

  async sendDots(dot: string | number, context = null) {
    if (!this.data.label) return;

    if (context) {
      const key: string = this.data.label;
      return await Api.post(`${this.apiName}/${this.data.label}`, { value: 0, context: { [key]: dot } });
    }


    const key: string = this.data.label;
    return await Api.post(`devices/${this.data?.device?.label}`, { [key]: { value: dot } });
  }
}

export class Variables extends Buildable implements ICreate {
  protected entity: string = 'variables';
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
    return super._where(field, VariableObject);
  }

  create(data: Partial<Variable>): Promise<any> {
    return Api.post(this.entity, data);
  }

  all() {
    return super._all(VariableObject);
  }

}
