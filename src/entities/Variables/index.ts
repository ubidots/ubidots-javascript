import UbidotsObject from '../common/UbidotsObject';
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
import api from '../../Api/Api';


export class VariableObject extends UbidotsObject<Variable> {

  public data: Partial<Variable> = {};
  protected apiName: string = 'variables';
  protected gettable: (keyof Variable)[] = [
    'createdAt',
    'syntheticExpression',
    'description',
    'icon',
    'id',
    'label',
    'lastActivity',
    'lastValue',
    'name',
    'tags',
  ];


  constructor(data: Partial<Variable>) {
    super();
    if (!data.device?.label || !data.label) {
      throw new Error('Device and variable label is required');
    }

    this.createProperties();
    this.data = data;
  }

  get device(): DeviceObject {
    return <DeviceObject>this.belongsTo(DeviceObject, 'device');
  }

  async sendDots(dot: string | number, context = null) {
    if (!this.data.label) return;

    if (context) {
      const key: string = this.data.label;
      return await Api.post(`${this.apiName}/${this.data.label}`, { value: 0, context: { [key]: dot } });
    }


    const key: string = this.data.label;
    const url = `devices/${this.data?.device?.label}`;
    api.setVersion('v1.6');
    return await Api.post(url, { [key]: { value: dot } });
  }
}

export class Variables extends Buildable implements ICreate {
  protected entity: string = 'variables';
  // Just to test
  fieldsWithFilters: Record<string, FilterTypes> = {
    createdAt: DateFilter,
    syntheticExpression: StringFilter,
    description: StringFilter,
    icon: StringFilter,
    id: NumberFilter,
    label: StringFilter,
    lastActivity: DateFilter,
    lastValue: StringFilter,
    name: StringFilter,
    tags: DateFilter,
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
