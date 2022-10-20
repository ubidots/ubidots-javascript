import { Constructable } from '../../index';
import Api from '../Api/Api';
import { BuildManager } from './Builder';
import { UbidotsResponse } from '../Api/auth.models';
import { API_BASE_URL } from '../config';

export class BaseFilter<T> {
  readonly #type: Constructable<T>;

  constructor(type: Constructable<T>) {
    this.#type = type;
  }

  public async get(): Promise<T[]> {
    Api.setVersion('v2.0');

    const { results } = await Api.get<T[]>(`${BuildManager.entity}?`, {
      params: BuildManager.params,
      headers: BuildManager.headers,
    });

    BuildManager.reset();

    return results.map((item) => {
      const ubidotsEntity = new this.#type(item);

      Object.defineProperties(ubidotsEntity, {
        gettable: {
          enumerable: false,
        },
        objectName: {
          enumerable: false,
        },

      });
      return ubidotsEntity;
    });
  }


  public debug() {
    const joinedParams = Object.entries(BuildManager.params).map(([key, value]) => `${key}=${value}`).join('&');
    return {
      url: `${API_BASE_URL}/${Api.getVersion()}/${BuildManager.entity}?${joinedParams}`,
      headers: BuildManager.headers,
    };
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

  public rawFilter(filterObject: { [key: string]: string | number }) {
    for (const [key, value] of Object.entries(filterObject)) {
      BuildManager.addRawQuery(key, value);
      console.log(BuildManager.params);
    }
    return this;
  }


  withHeaders(headers: { [key: string]: string }) {
    BuildManager.addHeader(headers);
    return this;
  }
}

