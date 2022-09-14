import Api from '../../Api/Api';
import { Device } from './device.model';
import { UbidotsResponse } from '../../Api/auth.models';


type  DeviceFIlter = ''

interface Model<T> {
  getAll(): Promise<UbidotsResponse<T[]>>;

  get(id: string): Promise<UbidotsResponse<T>>;
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


class Devices implements Model<Device> {


  params: Record<string, number | string> = {};

  public async getAll(): Promise<UbidotsResponse<Device[]>> {
    const response = await Api.get<Device[]>('devices?', { params: this.params });
    // On fetch
    this.params = {};
    return response;
  }


  public async get(id: string): Promise<UbidotsResponse<Device>> {
    const data = await Api.get<Device>(`devices/${id}`, this.params);
    this.params = {};
    return data;
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
