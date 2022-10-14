import { Constructable } from '../../index';
import Api from '../Api/Api';
import { BuildManager } from './Builder';
import { UbidotsResponse } from '../Api/auth.models';

export class BaseFilter<T> {
  readonly #type: Constructable<T>;

  constructor(type: Constructable<T>) {
    this.#type = type;
  }

  public async get(): Promise<T[]> {
    const { results } = await Api.get<T[]>(`${BuildManager.entity}?`, { params: BuildManager.params });
    BuildManager.reset();

    return results.map((item) => {
      const instance = new this.#type(item);

      Object.defineProperties(instance, {
        gettable: {
          enumerable: false,
        },
        objectName: {
          enumerable: false,
        },
      });
      return instance;
    });
  }

  public async getRaw(): Promise<UbidotsResponse<T>> {
    const response = await Api.get<T>(`${BuildManager.entity}?`, { params: BuildManager.params });
    BuildManager.reset();
    return response;
  }

  public orderBy(field: string, order: 'asc' | 'desc' = 'asc') {
    const preffix = order === 'asc' ? '' : '-';

    BuildManager.addRawQuery(`${preffix}sort_by`, field);
    return this;
  }

  public pick(fields: string[]) {
    BuildManager.addRawQuery('fields', [...fields, 'id'].join(','));
    return this;
  }

  public paginate(page: number, pageSize: number) {
    BuildManager.addRawQuery('page', page);
    BuildManager.addRawQuery('page_size', pageSize);
    return this;
  }
}

