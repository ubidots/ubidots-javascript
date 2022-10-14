import Api from '../../Api/Api';

interface UbidotsEntityBase {
  id: string;
}

abstract class UbidotsObject<T extends UbidotsEntityBase> {
  protected abstract objectName: string;
  protected abstract gettable: (keyof T)[];
  protected abstract data: Partial<T>;

  protected async fetchDataFromApi<T>(): Promise<T> {
    const newData: T = await Api.getRawResponse<T>(`${this.objectName}/${this.data.id}/`);
    this.setData(newData);
    return newData;
  }


  protected createProperties() {
    for (let key of this.gettable) {
      if (this[key as keyof this] !== undefined) continue;

      Object.defineProperty(this, key, {
        get: async () => {
          const value = this.data[key as keyof T];
          if (value === undefined) {
            const newData: T = await this.fetchDataFromApi<T>();
            return newData[key as keyof T];
          }

          return value;
        },
      });
    }
  };

  private setData(data: any) {
    this.data = data;
  };
}

export default UbidotsObject;
