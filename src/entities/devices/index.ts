import Api from '../../Api/Api';
import { Device } from './device.model';
import { UbidotsResponse } from '../../Api/auth.models';


interface Builder<T> {
  params: Record<string, string | number>;

  get(): Promise<UbidotsResponse<T[]>>;
}

type CommonOperations = 'name'
  | 'label'
  | 'organization'
  | 'variablesNumber'
  | 'isActive'
  | 'description'
  | 'createdAt'
  | 'lastActivity'


type Filter = CommonOperations | 'tags' | 'url' | 'properties';

type Sortable =
  'name'
  | 'label'
  | 'organization'
  | 'variablesNumber'
  | 'isActive'
  | 'description'
  | 'createdAt'
  | 'lastActivity'


class Devices implements Builder<Device> {

  params: Record<string, string | number> = {};

  public async get(): Promise<UbidotsResponse<Device[]>> {
    const response = await Api.get<Device[]>('devices?', { params: this.params });
    // On fetch
    this.params = {};
    return response;
  }

  public filter(key: Filter, value: string | number) {
    this.params[key] = value;
    return this;
  }

  public sort(key: Sortable, ordering: 'asc' | 'desc') {
    this.params['sort_by'] = ordering === 'asc' ? key : `-${key}`;
    return this;
  }
}


export default Devices;
