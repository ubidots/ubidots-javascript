import { Filter } from './constants';
import { StringFilter } from '../Filters/Filters';
import { Constructable } from '../../index';

type FilterTypes = typeof StringFilter;


export class BuildManager {
  static #params: Record<string | Filter, string | number> = {};
  static #fields: string[] = [];
  public static entity = '';

  public static get params() {
    return BuildManager.#params;
  }

  public static reset() {
    BuildManager.#params = {};
    BuildManager.#fields = [];
  }


  public static buildQuery(suffix = '', value: string | number) {
    const fields = BuildManager.#fields.join('__');
    BuildManager.#params[`${fields}${suffix}`] = value;
  }

  public static addField(field: string) {
    BuildManager.#fields = [...BuildManager.#fields, field];
  }

  public static addRawQuery(name: string, value: string | number) {
    BuildManager.#params[name] = value;
  }
}


export abstract class Buildable {
  protected abstract fieldsWithFilters: Record<string, FilterTypes>;
  protected abstract entity: string;


  protected _where<T>(field: string, type: Constructable<T>) {
    if (!this.fieldsWithFilters[field]) {
      console.error(`Field ${field} does not exist`);
    }

    BuildManager.addField(field);
    BuildManager.entity = this.entity;

    const Filter: FilterTypes = this.fieldsWithFilters[field];
    return new Filter(type);
  }
}
