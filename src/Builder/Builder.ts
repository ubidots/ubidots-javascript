import { Filter } from './Builder.types';
import { StringFilter } from '../Filters/FilterBuilders';
import { Constructable } from '../../index';
import { BaseFilter } from './BaseFilter';

type FilterTypes = typeof StringFilter;


export class BuildManager {
  static #params: Record<string | Filter, string | number> = {};
  static #fields: string[] = [];
  static #entity: string[] = [];

  public static get entity(): string {
    return BuildManager.#entity.join('/');
  }

  public static addEntity(entity: string) {
    BuildManager.#entity.push(entity);
  }


  public static get params() {
    return BuildManager.#params;
  }

  public static reset() {
    BuildManager.#params = {};
    BuildManager.#fields = [];
    BuildManager.#entity = [];
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

    BuildManager.reset();
    BuildManager.addField(field);
    BuildManager.addEntity(this.entity);

    const Filter: FilterTypes = this.fieldsWithFilters[field];
    return new Filter(type);
  }

  protected _all<T>(type: Constructable<T>) {
    BuildManager.reset();
    BuildManager.addEntity(this.entity);
    return new BaseFilter(type);
  }
}
