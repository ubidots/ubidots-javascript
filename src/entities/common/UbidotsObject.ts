import Api from '../../Api/Api';
import { Buildable, BuildManager } from '../../Builder/Builder';
import { Constructable } from '../../../index';

export interface UbidotsEntityBase {
  id: string;
}

abstract class UbidotsObject<T extends UbidotsEntityBase> {
  protected abstract apiName: string;
  protected abstract gettable: (keyof T)[];
  protected abstract data: Partial<T>;

  public async refresh<T>(): Promise<T> {
    const newData: T = await Api.getRawResponse<T>(`${this.apiName}/${this.data.id}/`);
    this.setData(newData);
    return newData;
  }


  protected createProperties() {
    for (let key of this.gettable) {
      if (this[key as keyof this] !== undefined) continue;
      Object.defineProperty(this, key, {
        get: async () => {
          return this.data[key as keyof T];
        },
      });
    }
  };

  private setData(data: any) {
    this.data = data;
  };


  protected hasMany<T>(entity: Constructable<Buildable>): T {
    if (!this.data.id) {
      console.error('ID is required, try using refresh() before if data is not working as you pretend to');

      BuildManager.addEntity(this.apiName);
      return new entity() as T;
    }

    BuildManager.reset();
    BuildManager.addEntity(this.apiName);
    BuildManager.addEntity(this.data.id);
    return new entity() as T;
  };

  protected belongsTo<T extends UbidotsEntityBase>(entity: Constructable<UbidotsObject<any>>, key: string): UbidotsObject<T> {
    // @ts-ignore
    const id = this.data[key].id;
    return new entity({ id });
  };
}

export default UbidotsObject;
